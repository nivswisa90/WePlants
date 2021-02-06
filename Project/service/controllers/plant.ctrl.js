const Plant = require("../models/plants");

exports.plantDBController = {
  async getPlants(req, res) {
    if (req.query.name) {
      Plant.find({
        $or: [
          {
            name: req.query.name,
          },
          {
            family: req.query.name,
          },
        ],
      })
        .then((docs) => {
          res.json(docs);
        })
        .catch((err) => console.log(`Error getting the data from DB: ${err}`));
    }
    else {
      Plant.find({})
        .then(docs => res.json(docs))
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
    }
  },
  getPlant(req, res) {
    Plant.findOne({
      id: parseInt(req.params.id),
    })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },
  async addPlant(req, res) {
    const index = await new Promise((resolve, reject) => {
      const index = Plant.findOne({}).sort({_id: -1}).limit(1);
      resolve(index);
    });

    Plant.countDocuments(
      {
        name: req.body.name,
      },
      function (err, count) {
        if (err) {
          res.status(404).send(`Error: ${err}`);
        } else if (count == 1) {
          res.status(404).send("User already exist");
        } else {
          const newPlant = new Plant({
            id: index.id + 1,
            name: req.body.name,
            specie: req.body.specie,
            image_url: req.body.image_url,
            family: req.body.family,
            description: req.body.description,
            way_of_care: req.body.way_of_care,
          });

          newPlant
            .save()
            .then((docs) => {
              res.json(docs);
            })
            .catch((err) =>
              console.log(`Error getting the data from DB: ${err}`)
            );
        }
      }
    );
  },
  updatePlant(req, res) {
    const toUpdate = req.body.way_of_care;
    let set = {
      $set: {},
    };
    if (toUpdate.water) {
      set.$set["way_of_care.water"] = toUpdate.water;
    }
    if (toUpdate.feed) {
      set.$set["way_of_care.feed"] = toUpdate.feed;
    }
    if (toUpdate.light) {
      set.$set["way_of_care.light"] = toUpdate.light;
    }
    if (toUpdate.temperature) {
      set.$set["way_of_care.temperature"] = toUpdate.temperature;
    }
    if (req.body.image_url) {
      set.$set["image_url"] = req.body.image_url;
    }
    if (req.body.description) {
      set.$set["description"] = req.body.description;
    }
    Plant.updateOne(
      {
        id: parseInt(req.params.id),
      },
      set
    )
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error updating the data in DB: ${err}`));
  },
  deletePlant(req, res) {
    Plant.findOneAndDelete({
      id: parseInt(req.params.id),
    })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },
};