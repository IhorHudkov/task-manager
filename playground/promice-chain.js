import "../src/db/mongoose.js";

import User from "../src/models/user.js";

// User.findByIdAndUpdate("6130a253bc56a2edda40a774", {
//   name: 'Karl',
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ name: 'Ihor' });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("6130a253bc56a2edda40a774", 50)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
