export default function validatormiddleware(schema){
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body);

        if (error){
            return res.json({ error: error.message})
        }
        req.body = value;
        next()
    }
}