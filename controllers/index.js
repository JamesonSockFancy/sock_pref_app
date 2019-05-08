const mongoose = require('mongoose');
const Customer = require('../models/customer')

exports.showSubscribers = async ( req, res, next) => {

    const customers = await Customer.find()
    res.render('index', {
        title: 'Subscribers',
        customers: customers
      });

}