//require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'postgres',
    dialect: 'postgres',
    port: 5432,
  });
  
  sequelize
    .sync()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log('Unable to connect to the database:', err);
    });


const Projects = sequelize.define('Projects', 
    {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    },
    {
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    year: Sequelize.INTEGER,
    link: Sequelize.STRING
    },
    {
        tableName: 'Projects',
        createdAt: false, 
        updatedAt: false, 
        freezeTableName: true,
    }
);

const Skills = sequelize.define('Skills', 
    {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    },
    {
        skill: Sequelize.STRING
    },
    {
        tableName: 'Skills',
        createdAt: false, 
        updatedAt: false, 
        freezeTableName: true,
    }
);

Projects.belongsToMany(Skills, {through: 'ProjectSkills'});
Skills.belongsToMany(Projects, {through: 'ProjectSkills'});

const initialize = () => {
    return new Promise ((resolve, reject) => {
        sequelize.sync()
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err.message);
        })
    });
};

const getAllProjects = () => {
    return new Promise ((resolve, reject) => {
        sequelize.sync()
            .then(() => {
                Projects.findAll({ include: [Skills] })
                .then((projs) => {
                    if(projs && projs.length > 0) {
                        const projsJson = projs.map(proj => proj.get({plain : true}));
                        resolve(projsJson);
                    }
                    else {
                        const err = new Error("No Projects Available");
                        reject(err);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
            })
            .catch((err) => {
                reject(err);
            })
    })
};

// for possible later use

const addProject = (newProj) => {
    return new Promise((resolve, reject) => {
        Projects.create(newProj)
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
};

const deleteProject = (idNum) => {
    return new Promise((resolve, reject) => {
        Projects.destroy({ where: {id : idNum}})
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
};

const editProject = (newProj, idNum) => {
    return new Promise((resolve, reject) => {
        Projects.update(newProj, {where: {id : idNum}})
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}

const addSkill = (skill) => {
    // ????
}

const deleteSkill = (idNum) => {
    // ????
}

const editSkill = (newSkill, idNum) => {
    // ????
}

module.export = { initialize, getAllProjects};