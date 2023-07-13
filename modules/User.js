// const {Schema, model} = require('pg');

// const User = new Schema({
//     username: {type: String, unique: true, Required: true},
//     f_name: {type: String, unique: false, Required: true},
//     l_name: {type: String, unique: false, Required: true},
//     email: {type: String, unique: true, Required: true},
//     password: {type: String, unique: true, Required: true},
//     grade_id: {type: Number, unique: false, Required: true},
//     department_id: {type: Number, unique: false, Required: true},
//     group_id: [{type: Number, ref: 'Role'}],
//     status: {type: String, unique: false, Required: true}
// })

// module.exports = model('User', User)
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://pstgres:180886@localhost:5432/Scriptum'
});

const User = {
  async create(username, f_name, l_name, email, password, grade_id, department_id, group_id, status) {
    const query = {
      text: 'INSERT INTO users(username, f_name, l_name, email, password, grade_id, department_id, group_id, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      values: [username, f_name, l_name, email, password, grade_id, department_id, group_id, status],
    };

    try {
      const { rows } = await pool.query(query);
      return rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
};

module.exports = {
    User
}