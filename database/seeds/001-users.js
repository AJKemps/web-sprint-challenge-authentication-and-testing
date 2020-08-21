exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Alex", password: "password" },
        { username: "Marie", password: "password" },
        { username: "Tom", password: "password" },
        { username: "Jess", password: "password" },
      ]);
    });
};
