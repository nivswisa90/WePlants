const Plant = require("../models/plants");

exports.plantDBController = {
  async getPlants(req, res) {
    if (req.query.name) {
      const plantName = req.query.name;

      Plant.find({
        $or: [
          {
            plantName: plantName,
          },
          {
            family: plantName,
          },
        ],
      }).collation( { locale: 'en', strength: 2 })
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
    console.log(req.body);

    Plant.countDocuments(
      {
        plantName: req.body.plantName,
      },
      function (err, count) {
        if (err) {
          res.status(404).send(`Error: ${err}`);
        } else if (count == 1) {
          res.status(404).send("User already exist");
        } else {
          const newPlant = new Plant({
            id: index.id + 1,
            plantName: req.body.plantName,
            specie: req.body.specie,
            imageUrl: req.body.imageUrl,
            family: req.body.family,
            description: req.body.description,
            wayOfCare: req.body.wayOfCare,
          });

          newPlant
            .save()
            .then((docs) => {
              res.json('Succesfully added plant!');
            })
            .catch((err) =>
              console.log(`Error getting the data from DB: ${err}`)
            );
        }
      }
    );
  },
  updatePlant(req, res) {
    const toUpdate = req.body.wayOfCare;
    let set = {
      $set: {},
    };
    if (toUpdate.water) {
      set.$set["wayOfCare.water"] = toUpdate.water;
    }
    if (toUpdate.feed) {
      set.$set["wayOfCare.feed"] = toUpdate.feed;
    }
    if (toUpdate.light) {
      set.$set["wayOfCare.light"] = toUpdate.light;
    }
    if (toUpdate.temperature) {
      set.$set["wayOfCare.temperature"] = toUpdate.temperature;
    }
    if (req.body.imageUrl) {
      set.$set["imageUrl"] = req.body.imageUrl;
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