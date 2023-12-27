const projectData = require('./projectData')
const cors = require('cors');
const path = require('path');
const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 8888; 



app.use(cors());


projectData.initialize()
.then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`)); 
})
.catch((err) => {
    console.log("Failed to load Docker database", err);
})


app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});
app.get('/projects', (req,res) => {
    projectData.getAllProjects()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        console.log(err);
    })
})
app.get('/jobs', (req, res) => {
    
    projectData.getAllJobs()
    .then((data) => {
        if(data && data.length > 0) {
            res.send(data);
        } else {
            res.send([]);
        }
        
    })
    .catch((err) => {
        console.log(err);
    })
})
app.get('/images/:image', (req, res) => {
    const image = req.params.image;
    const imagePath = path.join(__dirname, 'images', image);

    res.sendFile(imagePath);
})
