class User {
  /**
  * class constructor
  * @param {object} data
  */
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'nignanthomas@gmail.com',
        first_name: 'Thomas',
        last_name: 'Nignan',
        password: 'qwerty',
        is_admin: true,
      },
      {
        id: 2,
        email: 'nziokaivy@gmail.com',
        first_name: 'Ivy',
        last_name: 'Mwende',
        password: 'password',
        is_admin: false,
      },
    ];
  }

  /**
  *
  * @param {object} user object
  */
  createUser(data) {
    const newUser = {
      id: this.trips.length + 1,
      email: data.email || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      password: data.password || '',
      is_admin: data.is_admin || false,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
  * @param {id} id
  * @returns {object} user object
  */
  getOneUser(id) {
    return this.users.find(user => user.id === id);
  }

  /**
  * @returns {object} return all users
  */
  getAllUsers() {
    return this.users;
  }

  /**
  *
  * @param {id} id
  * @param {object} data
  */
  updateUser(id, data) {
    const user = this.getOneUser(id);
    const index = this.users.indexOf(user);
    this.users[index] = {
      id: user.id,
      first_name: data.first_name || user.first_name,
      last_name: data.last_name || user.last_name,
      email: data.email || user.email,
      password: data.password || user.password,
      is_admin: data.is_admin || user.is_admin,
    };
    return user;
  }

  /**
  *
  * @param {id} id
  */
  deleteUser(id) {
    const user = this.getOneUser(id);
    // [user, ...otherUsers] = this.users;
    // this.users = otherUsers;
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return {};
  }
}
export default new User();
