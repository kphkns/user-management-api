const pool = require("../config/db");

exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        //Check for missing fields
        if (!name) return res.status(400).json({ error: "Name is required." });
        if (!email) return res.status(400).json({ error: "Email is required." });
        if (!age) return res.status(400).json({ error: "Age is required." });

        //Check if email already exists
        const [existingUser] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        //  Insert new user
        const [result] = await pool.execute(
            "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
            [name, email, age]
        );

        res.status(201).json({ id: result.insertId, name, email, age });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.execute("SELECT * FROM users");

        // Check if users list is empty
        if (users.length === 0) {
            return res.status(404).json({ message: "No user data available." });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Retrieve a single user
exports.getUserById = async (req, res) => {
    try {
        const [users] = await pool.execute("SELECT * FROM users WHERE id = ?", [req.params.id]);
        if (users.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Improved Update User (Handles Partial Updates)
exports.updateUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const userId = req.params.id;

        // Fetch current user data before updating
        const [existingUser] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Use COALESCE to retain existing values if new ones are undefined
        const [result] = await pool.execute(
            `UPDATE users 
            SET name = COALESCE(?, name), 
                email = COALESCE(?, email), 
                age = COALESCE(?, age) 
            WHERE id = ?`,
            [name || existingUser[0].name, email || existingUser [0].email, age || existingUser[0].age, userId]
        );

        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
