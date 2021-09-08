import "../src/db/mongoose.js";
import Task from "../src/models/task.js";

// Task.findByIdAndDelete("612e31ccf23aa6fddb5d995a")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: true });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount('612f5b0a18839d7ad0814306').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
