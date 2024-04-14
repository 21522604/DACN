const Size = require('../models/size');

let create = async (req, res, next) => {
    let size_name = req.body.size_name;
    if(size_name === undefined) return res.status(400).send('Trường tên size không tồn tại');
    let size = await Size.findOne({ where: { size_name } });
    if(size) return res.status(409).send('Tên size đã tồn tại');
    else {
        let newSize = await Size.create({ size_name });
        return res.send(newSize);
    }
}

let list = async (req, res, next) => {
    let sizes = await Size.findAll({ 
        attributes: ['size_id', 'size_name'],  
        raw: true 
    });
    return res.send(sizes);
}

module.exports = {
    create,
    list,
};
