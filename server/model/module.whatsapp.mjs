import { pool } from "../DB.mjs";
import mysql from 'mysql'


export const get_D360_API_KEY = async (req, res) => {
    const con = mysql.createConnection(pool);
}