const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema();

taskSchema.add({
    name: String,
    userId: String
});

taskSchema.methods.toDTO = function() {
    const obj = this.toObject();

    return {
        id: obj._id,
        name: obj.name
    }
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;