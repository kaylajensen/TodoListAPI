'use strict';
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

// Find by ID only
// exports.read_a_task = function(req, res) {
//   Task.findById(req.params.taskId, function(err, task) {
//     if (err) {
//       res.send(err);
//     }
//     res.json(task);
//   });
// };

// Find by ID or NAME
exports.read_a_task = function (req, res) {
  var id  = req.params.taskId;
  var $or = [ { name : id } ];

  if (ObjectId.isValid(id)) {
    $or.push({ _id : ObjectId(id) });
  }

  Task.find({ $or : $or }).exec(function (err, task) {
    // TODO: check for errors
    if (err) {
      res.send(err);
    }
    res.send(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Task successfully deleted' });
  });
};
