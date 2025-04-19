
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
    repo: Sequelize.STRING,
    site: Sequelize.STRING
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
    details: Sequelize.STRING,
    skills: Sequelize.STRING,
    description: Sequelize.TEXT
}, {
    tableName: 'Jobs',
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
});


const initialize = async () => {
    try {
      await sequelize.sync({ force: true }); // drops and recreates all tables + sequences
  
      await initializeDatabase(); // loads default data
      console.log("Initialization complete");
    } catch (err) {
      console.error("Database initialization error:", err);
    }
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
    // await Projects.destroy({ truncate: { cascade: true } });
    // await Jobs.destroy({ truncate: { cascade: true } });
    // await ProjectSkills.destroy({ truncate: { cascade: true } });

    // sequelize.sync({ force: true })

    // await Projects.sync({alter: true});
    // await Jobs.sync({alter: true});

    

    try {
        const allProjs = await Projects.findAll();

        if(allProjs.length === 0 || !allProjs)
        {
            await Projects.create({
                image: 'kingdomDeath.jpg',
                title: 'Kingdom Death',
                description: 'My introduction to the software development world. This project is a fork off github of an unmaintained repository. I added more to the game board and changed the board itself significantly.',
                date: new Date(2022, 9, 9),
                site: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2672585904',
                repo: 'https://github.com/Farbod678/kdm-tts',
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
                description: 'My professional Portfolio Site. Uses a React front-end with a back-end that is Dockerized and deployed using Kubernetes. Automated using Github Actions and uses a Postgres image to store project data and job data.',
                date: new Date(2023, 12, 31),
                site: '',
                repo: 'https://github.com/Farbod-Moayeri/resume-frontend',
                skills: [
                    { skill: "Docker" },
                    { skill: "Kubernetes" },
                    { skill: "Github Actions" },
                    { skill: "CI/CD" },
                    { skill: "React" },
                    { skill: "Javascript" },
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
                title: 'Lego Gallery',
                description: 'A website that features lego sets and has CRUD operations to add, edit, or delete sets. Features proper authentication and authorization for the CRUD operations, with good data practices in terms of salting and hashing user credentials.',
                date: new Date(2023, 12, 17),
                site: 'https://lego-gallery.onrender.com/',
                repo: 'https://github.com/Farbod-Moayeri/a3_cyclic',
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

            await Projects.create({
                image: 'artGallery.jpeg',
                title: 'Art Gallery',
                description: 'A website that features art pieces and has CRUD operations to add to favorites and to remove as well. Features good data practices in terms of salting and hashing user credentials.',
                date: new Date(2024, 4, 16),
                site: 'https://web422a6-5jib.onrender.com/',
                repo: 'https://github.com/Farbod-Moayeri/Web422a6',
                skills: [
                    { skill: "React Hook Form"},
                    { skill: "JWT"},
                    { skill: "SWR"},
                ]
            }, {
                include: [{
                    model: Skills,
                    as: 'skills'
                }]
            })
            
            await Projects.create({
                image: 'mangaScraper.png',
                title: 'Manga Scraper',
                description: 'An IntelliJ Java project which utilizes Selenium to scrape manga off of a website. Uses Swing GUI for interaction with the user.',
                date: new Date(2025, 4, 16),
                site: '',
                repo: 'https://github.com/Farbod-Moayeri/Manga-Scraper',
                skills: [
                    { skill: "Selenium"},
                    { skill: "Swing GUI"},
                    { skill: "Java"},
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
                startDate: new Date(2024, 5, 6),
                endDate: new Date(2024, 11, 27),
                title: 'Jr Software Engineering Co-op',
                details: 'Ministry of Children, Community and Social Services',
                skills: 'Testing/Selenium/Java',
                description: 'Gained hands-on experience in both regression and sanity testing, \
                and contributed to the development of automation scripts using the Selenium framework integrated with Cucumber.',
            })

            await Jobs.create({
                startDate: new Date(2023, 1, 0),
                endDate: new Date(2026, 1, 0),
                title: 'Student at Seneca Polytechnic',
                details: 'Computer Programming and Analysis',
                skills: 'C/C++/Web Development',
                description: 'I enrolled in Seneca Polytechnic to become a software developer because I realized I had a passion for it;\
                A passion for planning out large projects and a passion for developing them.',
            })


            await Jobs.create({
                startDate: new Date(2022, 5, 19),
                endDate: new Date(2023, 1 , 0),
                title: 'Apprentice Electrician',
                details: 'Hillview Electric',
                skills: 'Troubleshooting/Testing/Labeling',
                description: 'Collaborated with senior electricians to ensure accurate placement and alignment of components according to project specifications. \
                Effectively communicated and coordinated with team members to streamline tasks, enhance productivity, and complete projects on schedule.',
            })


            await Jobs.create({
                startDate: new Date(2018, 7, 0),
                endDate: new Date(2022, 5, 1),
                title: 'Apprentice Electrician',
                details: 'Vesta Electric',
                skills: 'Wiring/Measuring/Installing',
                description: 'Gained practical experience in installing, repairing, and maintaining electrical systems under the guidance\
                of experienced electricians. Developed proficiency in reading and interpreting electrical blueprints, schematic diagrams, and technical specifications.',
            })
        }
        
    } catch(err) {
        console.error(err);
    }
};




module.exports = { initialize, getAllProjects, getAllJobs };