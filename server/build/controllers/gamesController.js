"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM games', function (err, rows, fields) {
                if (err)
                    throw err;
                const games = rows;
                res.json(games);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id], function (err, rows, fields) {
                if (err)
                    throw err;
                const games = rows;
                if (games.length > 0) {
                    return res.json(games[0]);
                }
                res.status(404).json({ text: "The game doesn't exits" });
                //res.json(games);
            });
            //console.log(games);
            //res.json({text: 'Game founded'});
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body); para ver que esta recibiendo los datos
            yield database_1.default.query('INSERT INTO games set ?', [req.body]);
            res.json({ message: 'Game Saved' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'Deleting a game' + req.params.id});
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({ message: 'The game was deleted' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({text: 'Updating a game' + req.params.id});
            const { id } = req.params;
            yield database_1.default.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The game was updated' });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
