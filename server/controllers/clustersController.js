const Clusters = require('../models/ClusterSchema');


module.exports.list = (req, res) => {
    Clusters.find().then(clusters => {
        res.send(clusters);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving the clusters."
        });
    });
};
