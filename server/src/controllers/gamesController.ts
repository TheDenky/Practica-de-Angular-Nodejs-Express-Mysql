import {Request, Response} from 'express';

import pool from '../database'

class GamesController{
    public async list (req: Request, res: Response){
        await pool.query('SELECT * FROM games', function(err, rows, fields){
            if (err) throw err;
            const games = rows;
            res.json(games);
        });
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id], function(err, rows, fields){
            if(err) throw err;
            const games = rows;
                if (games.length > 0) {
                    return res.json(games[0]);
                }
                res.status(404).json({ text: "The game doesn't exits" });
            //res.json(games);
        });
        //console.log(games);
        //res.json({text: 'Game founded'});
        
    }

    public async create (req: Request, res: Response): Promise<void>{
        //console.log(req.body); para ver que esta recibiendo los datos
        await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Game Saved'});
    }
    public async delete (req: Request, res: Response) : Promise<void>{
        //res.json({text: 'Deleting a game' + req.params.id});
        const { id } = req.params;
        await  pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'The game was deleted'});
    }
    public async update (req: Request, res: Response): Promise<void>{
        //res.json({text: 'Updating a game' + req.params.id});
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: 'The game was updated'});
    }
}
const gamesController = new GamesController();
export default gamesController;
