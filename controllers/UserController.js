import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

class UserController {

    
    async singUp(req, res){
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);

            let found = await User.findOne({email: req.body.email});
          
            if(found){
                return res.status(400).json({message: "User exist"})
            }

            let user = await User.create(req.body);

            res.status(200).json({message: "success", user})
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async logIn(req, res){
        try {
            let user = await User.findOne({email: req.body.email})
            if(user !== null && await bcrypt.compare(req.body.password, user.password)){
                return jwt.sign({user}, process.env.SECRET_KEY,  { expiresIn: '3600s'} , (err, token) => {
                    res.json({
                        token,
                        id: user.id,
                        name: user.name,
                        role: user.role
                    });              
                });
            }

            res.status(404).json({message: "User not found", status: 404});
            
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getCurrentUser(req, res){
        try {
            let user = await User.findOne({_id: req.user._id});

            res.status(200).json({message: "success", user});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getById(req, res){
        try {
            let user = await User.findOne({_id: req.params.id});

            res.status(200).json({message: "success", user});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getAll(req, res){
        try {
            let users = await User.find({})

            res.status(200).json({message: "success", users});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default new UserController;