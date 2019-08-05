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
      id: this.users.length + 1,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
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
}
export default new User();
