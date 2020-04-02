const express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  keys = require('../../config/keys'),
  moment = require('moment');

// Load all the necessary models
const User = require('../../models/User'),
  Leave = require('../../models/Leave'),
  Update = require('../../models/Update'),
  Report = require('../../models/Report');

// @route POST api/employee/:id/updates
// @desc Submit the Updates of a employee with id = req.params.id
// @access Private
router.post('/:id/update', (req, res) => {
  const update = req.body;
  update.empId = req.params.id;
  update.date = moment().format('MMM Do YYYY');
  Update.find({ $and: [{ empId: req.params.id }, { date: update.date }] })
    .then(data => {
      if (!data.length) {
        Update.create(update)
          .then(update => {
            return res
              .status(200)
              .json({ message: "Successfully submited your today's updates." });
          })
          .catch(error => {
            return res.status(401).json({ message: error.message });
          });
      } else {
        return res.status(401).json({
          message: "You have already submitted today's work updates."
        });
      }
    })
    .catch(error => {
      return res.status(401).json({ message: error.message });
    });
});

// @route POST api/employee/:id/leaves
// @desc Submit the Leave data of a employee with id = req.params.id
// @access Private
router.post('/:id/leave', (req, res) => {
  const leave = req.body;
  leave.empId = req.params.id;
  leave.date = moment(leave.date).format('MMM Do YYYY');
  Leave.create(leave)
    .then(leave => {
      return res
        .status(200)
        .json({ message: 'Successfully updated the leaves.' });
    })
    .catch(error => {
      return res.status(400).json({ error: 'Error in submitting leaves.' });
    });
});

// @route POST api/employee/:id/reports
// @desc Submit the Leave Reports of a employee with id = req.params.id
// @access Private
router.post('/:id/report', (req, res) => {
  const report = req.body;
  report.empId = req.params.id;
  report.date = moment().format('MMM Do YYYY');
  Report.create(report)
    .then(report => {
      return res
        .status(200)
        .json({ message: 'Successfully submitted the reports.' });
    })
    .catch(error => {
      return res.status(400).json({ error: error.message });
    });
});

module.exports = router;
