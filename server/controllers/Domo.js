const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => res.render('app');

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required! ' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, color: newDomo.color });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occurred making domo!' });
  }
};

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age color').lean().exec();

    return res.json({ domos: docs });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

const getDomoPage = async (req, res) => {
  try {
    const query = { owner: req.session.account._id, name: req.params.domo };
    const doc = await Domo.findOne(query).select('name age color').lean().exec();

    return res.render('domo', { domo: doc });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error retrieving domo!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  getDomoPage,
};
