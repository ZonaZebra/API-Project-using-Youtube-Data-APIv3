import { NextFunction, Request, Response } from 'express';
import logging from '../logger/logging';
import { google, youtube_v3 } from 'googleapis';
import db from 'db';
import { QueryResult } from 'pg';

const NAMESPACE = 'Youtube API';

const queryYoutubeAPI = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = process.env.APIKEY;
    const youtube = google.youtube({
        version: 'v3',
        auth: apiKey
    });
    try {
        const searchQuery = req.query.search_query;
        const response = await youtube.search.list({
            part: ['snippet'],
            q: `${searchQuery}`,
            maxResults: 10
        });
        logging.info(NAMESPACE, `Youtube Search Query initiated for Tech Videos: "${searchQuery}"`);
        // @ts-ignore
        // ts-ignore is used because items will never be set to type undefined (the error)
        // and will always be a string or array of strings received from the query
        const items: youtube_v3.Schema$SearchResult[] = response.data.items;
        const titles = items.map((item) => item.snippet?.title);
        const channels = items.map((item) => item.snippet?.channelTitle);
        const video_and_channel = titles.map(function (e, i) {
            return [e, channels[i]];
        });

        const client = await db.pool.connect();


        for (const item of video_and_channel) {
            let sql: string = `insert into youtube_data(title, channels) values ('${item[0]}', '${item[1]}')`;
            await client.query(sql);
        }

        client.release();
        db.runMigrations();
        res.status(200).send('Channels & Titles transferred to DB successfully')
        logging.info(NAMESPACE, 'Channels & Titles transferred to DB successfully');
    } catch (err) {
        next(err);
    }

};

export default { queryYoutubeAPI };
