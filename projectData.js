//require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'postgres',
    dialect: 'postgres',
    port: 5432,
    logging: false,
  });
  
  sequelize
    .sync()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log('Unable to connect to the database:', err);
    });


const Projects = sequelize.define('Projects', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    image: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    date: Sequelize.DATE,
    link: Sequelize.STRING
}, {
    tableName: 'Projects',
    createdAt: false, 
    updatedAt: false, 
    freezeTableName: true,
});

const Skills = sequelize.define('Skills', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
        },
        skill: Sequelize.STRING
}, {
    tableName: 'Skills',
    createdAt: false, 
    updatedAt: false, 
    freezeTableName: true,
});

const ProjectSkills = sequelize.define('ProjectSkills', {
    projectId: {
        type: Sequelize.INTEGER,
        references: {
            model: Projects,
            key: 'id'
        }
    },
    skillId: {
        type: Sequelize.INTEGER,
        references: {
            model: Skills,
            key: 'id'
        }
    }
}, {
    tableName: 'ProjectSkills',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});


Projects.belongsToMany(Skills, { through: 'ProjectSkills', as: 'skills' });
Skills.belongsToMany(Projects, { through: 'ProjectSkills', as: 'projects' });

const Jobs = sequelize.define('Jobs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: Sequelize.DATE,
    title: Sequelize.STRING,
    description: Sequelize.STRING
}, {
    tableName: 'Jobs',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});


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
                Projects.findAll({ include: [{
                    model: Skills, 
                    as: 'skills' // Use the alias defined in the association
                }]})
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
                    reject(err.message);
                })
            })
            .catch((err) => {
                reject(err.message);
            })
    })
};

const getAllJobs = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync()
            .then(() => {
                Jobs.findAll()
                .then((allJobs) => {
                    if(allJobs && allJobs.length > 0) {
                        const jobsJson = allJobs.map(job => job.get({plain : true}));
                        resolve(jobsJson);
                    }
                    else {
                        const err = new Error("No Jobs Available");
                        reject(err.message);
                    }
                })
                .catch((err) => {
                    reject(err.message);
                })
            })
            .catch((err) => {
                reject(err.message);
            })
    })
}



// const jane = await Projects.create({ name: "Jane" });

const initializeDatabase = async () => {
    try {
        
        


    } catch (error) {
        console.error('Error during bulk creation:', error);
    }

    // ... any other async operations
};


initializeDatabase()
    .then(() => console.log('Initialization complete'))
    .catch(error => console.error('Error during initialization', error));

module.exports = { initialize, getAllProjects, getAllJobs };