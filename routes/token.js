import jwt from "jwt-simple";
import Users  from '../models/users';
import bcrypt from "bcrypt";

module.exports = app => {
    const cfg = app.libs.configs;

    app.post('/token', async (req, res) => {
        try {
            if (req.body.password && req.body.email) {
                const email = req.body.email;
                const password = req.body.password;
    
                const result = await Users.findOne({ email: email }).exec();
                
                if (bcrypt.compareSync(password, result.password)) {
                    const payload = { id: result.id };
                    res.json({
                        token: jwt.encode(payload, cfg.jwtSecret)
                    });
                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            res.sendStatus(500);
        }
    });
}
