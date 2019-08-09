import users from '../data/users.json';

class User {
  constructor({
    id, email, first_name, last_name, password, is_admin
  }) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.is_admin = is_admin;
  }
}

const createUser = (data) => {
  const newUser = new User({
    id: users.length + 1,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    password: data.password,
    is_admin: data.is_admin || false,
  });
  users.push(newUser);
  return newUser;
};

const getOneUser = id => users.find(user => user.id === id);

const getAllUsers = () => users;

module.exports = {
  createUser,
  getOneUser,
  getAllUsers,
};
