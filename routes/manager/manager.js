const express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  keys = require('../../config/keys'),
  fuzzysort = require('fuzzysort');

// Load all the necessary models
const User = require('../../models/User'),
  Leave = require('../../models/Leave'),
  Update = require('../../models/Update'),
  Report = require('../../models/Report');

// @route POST api/manager/
// @desc Shows all the Executives & Tele Callers
// @access Private
router.get('/', (req, res) => {
  User.find({ $or: [{ empType: 'teleCaller' }, { empType: 'executive' }] })
    .then(emps => {
      const data = {
        users: emps
      };
      const payload = data;
      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    })
    .catch(error => {
      return res.status(401).json({ message: 'No such user exsits.' });
    });
});

// @route POST api/manager/:name
// @desc Shows all the Executives & Tele Callers
// @access Private
router.get('/:name', (req, res) => {
  User.find({ $or: [{ empType: 'teleCaller' }, { empType: 'executive' }] })
    .then(emps => {
      fuzzysort
        .goAsync(req.params.name, emps, { key: 'name' })
        .then(results => {
          // Create JWT Payload
          const data = {
            users: results
          };
          const payload = data;
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        })
        .catch(error => {
          return res.status(401).json({ message: 'No such user exsits.' });
        });
    })
    .catch(error => {
      return res.status(401).json({ message: 'No such user exists.' });
    });
});

// @route POST api/manager/:id/updates
// @desc Shows all the updates of a an employee
// @access Private
router.get('/:id/updates', (req, res) => {
  Update.find({ empId: req.params.id })
    .then(updates => {
      // Create JWT Payload
      const data = {
        updates: updates
      };
      const payload = data;

      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    })
    .catch(error => {
      return res.status(400).json({ error: error.message });
    });
});

// @route POST api/manager/:id/reports
// @desc Shows all the Reports of a Tele Caller
// @access Private
router.get('/:id/reports', (req, res) => {
  Report.find({ empId: req.params.id })
    .then(reports => {
      // Create JWT Payload
      const data = {
        reports: reports
      };
      const payload = data;

      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    })
    .catch(error => {
      return res.status(400).json({ error: error.message });
    });
});

// @route POST api/manager/:id/leaves
// @desc Shows all the leaves of a an employee
// @access Private
router.get('/:id/leaves', (req, res) => {
  Leave.find({ empId: req.params.id })
    .then(leaves => {
      // Create JWT Payload
      const data = {
        leaves: leaves
      };
      const payload = data;

      // Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    })
    .catch(error => {
      return res.status(401).json({ error: error.message });
    });
});

// function for regex to help in fuzzy search
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;
