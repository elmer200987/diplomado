function validate (schema, tarjet = 'body'){
    return (req, res, next) => {
        const data = req[tarjet];
        
        if(!data || Object.keys(data).length === 0) {
            return res.status(400).json({message: 'No data found'});
        }

        const {error, value} = schema.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        })

        if(error) {
            return res.status(400).json({
                message: `Error de validacion en ${tarjet}`,
                errores: error.details.map(err=>err.message)
            })
        }
        req[tarjet] = value;
        next();
    }
}

export default validate