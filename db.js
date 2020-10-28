// const Pool = require("pg").Pool
// require("dotenv").config()

// console.log("log just to push again")

// const devConfig = {
//   user: "postgres",
//   password: "123456789aA_",
//   host: "localhost",
//   database: "gql_library",
//   port: 5432
// }

// const pool = new Pool({
//   user: "postgres",
//   password: "123456789aA_",
//   host: "localhost",
//   database: "gql_library",
//   port: 5432
// })

// another way of doing it
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const proConfig = process.env.DATABASE_URL;

// const proConfig = { 
//   connectionSting: process.env.DATABASE_URL //heroku addon
// }

// const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig)

// module.exports = pool;

const { Sequelize, DataTypes } = require('sequelize');

const devConfig = new Sequelize(
    'gql_library',
    'postgres',
    '123456789aA_',
    {
      dialect: 'postgres',
      host: 'localhost'
    }
);
  
// const proConfig = process.env.DATABASE_URL;

try {
    devConfig.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const Book = devConfig.define('book', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  { tableName: 'book',
    timestamps: false
  }
);

const Author = devConfig.define('author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  { tableName: 'author',
    timestamps: false
  }
);

// Relations
Author.hasMany(Book);
Book.belongsTo(Author);

const proConfig = process.env.DATABASE_URL;

// devConfig.sync({ force:true })
// console.log("All models are syncronized successfully")

// process.env.NODE_ENV === "production"
// process.env.DATABASE_URL

x = 1;
if(process.env.NODE_ENV === "production"){
  module.exports = proConfig;
}
else{
  module.exports = devConfig;
}