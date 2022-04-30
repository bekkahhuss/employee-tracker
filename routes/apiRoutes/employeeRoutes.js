const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all employees
router.get('/employee', (req, res) => {
    const sql = `SELECT employee.*, department.name AS department_name,
                 role.title AS title,
                 role.salary AS salary
                 FROM employee
                 LEFT JOIN department ON employee.department_id = department.id
                 LEFT JOIN role ON employee.role_id = role.id`;
                 

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