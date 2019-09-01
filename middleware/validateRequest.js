export default function validateRequest(req, res, next){

    if(typeof req.body.age !== 'number'){
        return res.status(422).json({message: "inccorect age number"})
    }

    next()
} 