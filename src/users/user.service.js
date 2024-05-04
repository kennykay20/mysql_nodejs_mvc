const pool = require("../database/config");
const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  createUser: (data, callBack) => {
    console.log("inside the user service");
    const { first_name, last_name, gender, email, phone, password } = data;
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);
    const isDeleted = false;
    pool.query(
      `insert into registration(first_name, last_name, gender, email, phone, password, isDeleted)
                values(?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, gender, email, phone, hashPassword, isDeleted],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `select id, first_name, last_name, email, phone, gender, isDeleted from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserById: (data, callBack) => {
    const { id } = data;
    const isDeleted = false;
    pool.query(
      `select id, first_name, last_name, email, phone, gender, isDeleted from registration where id = ? and isDeleted = ?`,
      [id, isDeleted],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    console.log('data', data);
    const { first_name, last_name, email, password, phone, gender, id } = data;
    let salt, hashPassword;
    if (password) {
      salt = genSaltSync(10);
      hashPassword = hashSync(password, salt);
    }
    const isDeleted = false;
    const idNum = Number(id);
    console.log('isnu', idNum);
    pool.query(
      `update registration set first_name=?, last_name=?, email=?, phone=?, gender=?, password=? where id = ? and isDeleted=?`,
      [first_name, last_name, email, phone, gender, hashPassword, idNum, isDeleted],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  removeUser: (data, callBack) => {
    const isDeleted = true;
    const { id } = data;
    console.log('id ', id);
    console.log('isDeleted ', isDeleted);
    pool.query(
      `update registration set isDeleted=? where id = ?`,
      [isDeleted, id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
