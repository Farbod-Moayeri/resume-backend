const projectData = require('./projectData')
const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 4444; 

app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});
app.get('/projects', (req,res) => {
    res.send([{
        image: "https://steamuserimages-a.akamaihd.net/ugc/1822265814192889849/8C2AA808C1607CFA78A5E60A6E0EEB79C0281925/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        title: "Kingdom Death: Monster 1.6 + CCG",
        description: "A fork of a popular tabletop simulator game", 
        year: 2020,
        link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2672585904",
        skills: ["C++", "Java", "NoSQL", "C#", "CSS", "Javascript", "Runescape"]
    },
    {
        image: "https://steamuserimages-a.akamaihd.net/ugc/1822265814192889849/8C2AA808C1607CFA78A5E60A6E0EEB79C0281925/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        title: "Kingdom Death: Monster 1.6 + CCG",
        description: "A fork of a popular tabletop simulator game", 
        year: 2020,
        link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2672585904",
        skills: ["C++", "Java", "NoSQL", "C#", "CSS", "Javascript", "Runescape"]
    },
    {
        image: "https://steamuserimages-a.akamaihd.net/ugc/1822265814192889849/8C2AA808C1607CFA78A5E60A6E0EEB79C0281925/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        title: "Kingdom Death: Monster 1.6 + CCG",
        description: "A fork of a popular tabletop simulator game", 
        year: 2020,
        link: "https://steamcommunity.com/sharedfiles/filedetails/?id=2672585904",
        skills: ["C++", "Java", "NoSQL", "C#", "CSS", "Javascript", "Runescape"]
    }]);
})