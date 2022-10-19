import {Request, Response} from 'express';
import db from 'db';

class DatabaseController {

    public async get(req: Request, res: Response) {
        try {
            const client = await db.pool.connect();

            const sql = 'SELECT * FROM "youtube_data" LIMIT 100';
            const { rows } = await client.query(sql);
            const results = rows;

            client.release();
            db.runMigrations();
            res.send(results);
        }
        catch (err) {
            res.status(400).send(err);
        }
    }

    public async post(req: Request, res: Response) {
        try {
            const client = await db.pool.connect();

            let sql = `insert into youtube_data(title, channels) values ('${req.query.title}', '${req.query.channels}');`;
            await client.query(sql);

            client.release();
            db.runMigrations();
            res.status(200).send('Added Data to DB');
        }
        catch (err) {
            res.status(400).send(err);
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            const client = await db.pool.connect();

            let sql = `UPDATE "youtube_data" SET title='${req.query.new_title}', channels='${req.query.new_channels}' WHERE title='${req.query.title}';`;
            const {rows} = await client.query(sql);
            const results = rows;

            client.release();
            db.runMigrations();
            res.status(200).send('Updated Data in DB').send(results);
        }
        catch (err) {
            res.status(400).send(err);
        }

    }

    public async delete(req: Request, res: Response) {
        try {
            const client = await db.pool.connect();

            let sql = `DELETE FROM "youtube_data" WHERE title='${req.query.title}';`;
            const {rows} = await client.query(sql);
            const results = rows;

            client.release();
            db.runMigrations();
            res.status(200).send('Deleted Data from DB').send(results);
        }
        catch (err) {
            res.status(400).send(err);
        }

    }


}

export default DatabaseController;