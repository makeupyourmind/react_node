import Contact from '../models/contact'

class ContactController {

    async create(req, res){
        try {
            let contact = await Contact.create(req.body);

            res.status(200).json(contact)
        } catch (error) {
            res.status(400).json(error.message)
        }
    } 

    async getAll(req,res){
        try {
            let contacts = await Contact.find({userId: req.user._id});

            res.status(200).json(contacts)
        } catch (error) {
            res.status(400).json(error.message)
        }
    } 


    async getById(req, res){
        try {
            let contact = await Contact.findOne({userId: req.user._id, _id: req.params.id});

            res.status(200).json(contact)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async updateById (req, res){
        try {
            let contact = await Contact.findOneAndUpdate({userId: req.user._id, _id: req.params.id}, req.body, {new : true});

            res.status(200).json(contact)
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async deleteById(req, res) {
        try {
            let deletedContact = await Contact.findOneAndRemove({_id: req.params.id, userId: req.body.userId});
            res.status(200).json({message: "Deleted successfully"})
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    async search(req, res){
        try {
            let find = await Contact.find({name: {$regex : req.query.value }, userId: req.user._id});
            res.status(200).json({message: "Success", find})
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
}

export default new ContactController;