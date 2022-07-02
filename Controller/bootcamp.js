const Bootcamp = require('../Model/Bootcamp');

exports.CreateNewUser = (req, res) => {
    const data = req.body;

    const user = new Bootcamp({
        name : data.name
    })

    user
        .save()
        .then(() => {
            res.json({
                msg : "Inserted ..."
            })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}