
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
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
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    title: Sequelize.STRING,
    description: Sequelize.TEXT
}, {
    tableName: 'Jobs',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});


const initialize = async () => {
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

const getAllProjects = async () => {
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

const getAllJobs = async () => {
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


const initializeDatabase = async () => {

    try {
        const allProjs = await Projects.findAll();

        if(allProjs.length === 0 || !allProjs)
        {
            await Projects.create({
                image: 'kingdomDeath.jpg',
                title: 'Kingdom Death: Monster 1.6 + CCG',
                description: 'My introduction to the software development world. This project is a fork off github of an unmaintained repository. I added more to the game board and changed the board itself significantly.',
                date: new Date(2021, 1, 0),
                link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2672585904',
                skills: [
                    { skill: "Lua" },
                    { skill: "TTS Lua" },
                    { skill: "Git" }
                ]
            }, {
                include: [{
                    model: Skills,
                    as: 'skills'
                }]
            })
            
            await Projects.create({
                image: 'portfolioWebsite.jpg',
                title: 'My Portfolio Site',
                description: 'Where my projects and work experience is displayed. Uses a React front-end with a back-end that is Dockerized and deployed using Kubernetes. Also, is automated such that on Github push, the image is built and pushed to DockerHub as well.',
                date: new Date(2023, 1, 0),
                link: 'https://farbodm.com',
                skills: [
                    { skill: "Javascript" },
                    { skill: "Github Actions" },
                    { skill: "CI/CD" },
                    { skill: "React" },
                    { skill: "Docker" },
                    { skill: "Kubernetes" },
                    { skill: "Tailwind"},
                    { skill: "Postgres"},
                    { skill: "Express"},
                    { skill: "Sequelize"}
                ]
            }, {
                include: [{
                    model: Skills,
                    as: 'skills'
                }]
            })
    
            await Projects.create({
                image: 'legoCollection.png',
                title: 'LegoCollection Gallery',
                description: 'A website that features lego sets and has CRUD operations to add, edit, or delete sets. Also, features proper authentication and authorization for the CRUD operations, with good data practices in terms of salting and hashing user credentials.',
                date: new Date(2023, 1, 0),
                link: 'https://crazy-waders-ant.cyclic.app/',
                skills: [
                    { skill: "JavaScript"},
                    { skill: "Tailwind"},
                    { skill: "Sequelize"},
                    { skill: "MongoDB" },
                    { skill: "Postgres" },
                    { skill: "Express" },
                    { skill: "Bcrypt"},
                    { skill: "EJS"},
                    { skill: "Client-Sessions"}
                ]
            }, {
                include: [{
                    model: Skills,
                    as: 'skills'
                }]
            })     
        }
    } catch(err) {  
        console.log(err);
    }
    
    try {
        const allJobs = await Jobs.findAll();

        if(allJobs.length === 0 || !allJobs)
        {
            await Jobs.create({
                startDate: new Date(2018, 1, 0),
                endDate: new Date(2021, 1, 0),
                title: 'Vesta Electric - Apprentice Electrician',
                description: 'Gained practical experience in installing, repairing, and maintaining electrical systems under the guidance\
                of experienced electricians. Developed proficiency in reading and interpreting electrical blueprints, schematic diagrams, and technical specifications.',
            })
            
            await Jobs.create({
                startDate: new Date(2021, 1, 0),
                endDate: new Date(2022, 1 , 0),
                title: 'Hillview Electric - Apprentice Electrician',
                description: 'Collaborated with senior electricians to ensure accurate placement and alignment of components according to project specifications. \
                Effectively communicated and coordinated with team members to streamline tasks, enhance productivity, and complete projects on schedule.',
            })
        }
        
    } catch(err) {
        console.error(err);
    }
};


initializeDatabase()
    .then(() => console.log('Initialization complete'))
    .catch(error => console.error('Error during initialization', error));

module.exports = { initialize, getAllProjects, getAllJobs };