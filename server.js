const express = require('express');
const { init } = require('./models/Product');
const routes = require('./routes');
// import sequelize connection

// const Sequelize - require('sequelize')
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`);
  });
});

// // creating new sequelize instance, passing in database connection details as the arguments
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql2'
// });

// // authenticate method
// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection has been established succesfully');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });
