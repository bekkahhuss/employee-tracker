const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


//Get all Roles 
router.get('/role', (req, res) => {
    const sql = `SELECT role.*, department.name
                 AS department_name 
                 FROM role
                 LEFT JOIN department
                 ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;