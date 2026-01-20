const db = require('../config/db'); // Suponiendo conexión a DB similar a la de PHP

exports.login = async (req, res) => {
    const { type, payload } = req.body;

    try {
        let user;
        if (type === 'student') {
            // payload: { student_id, pin }
            user = await db.query('SELECT * FROM students WHERE student_id = ? AND pin = ?', [payload.id, payload.pin]);
        }
        else if (type === 'teacher') {
            // payload: { fullname, password }
            user = await db.query('SELECT * FROM teachers WHERE fullname = ? AND password = ?', [payload.fullname, payload.password]);
        }
        else {
            // payload: { email, password }
            user = await db.query('SELECT * FROM visitors WHERE email = ? AND password = ?', [payload.email, payload.password]);
        }

        if (user.length > 0) {
            res.status(200).json({ success: true, user: user[0], role: type });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};