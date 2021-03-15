const mongoose = require('mongoose');

// Connect to the Database
mongoose.connect("mongodb://localhost/blue_division", {
  useNewUrlParser: true,
});

// Models
import Problem from "../models/problem";

let problemList = [
    {
        judge: "judge Name",
        problemID: "problem ID",
        title: "problem Title"
    }
];

let faults = 0;

//google sheet scrapper
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./client_secret.json'); // provided by google console developer
const doc = new GoogleSpreadsheet('1CBK_awNR3w_jx9vZz_DefVWQAsBjagsxppyhMqx1VLM'); //google sheet id
(async () => {
await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[2];
    const rows = await sheet.getRows();

    rows.forEach(row => {
        addProblems(row);
    })
    console.log(`total ${problemList.length - 1} problems scrapped with ${faults} issues`);
    // console.log(problemList[10]);
    pushtoDB();
})()

function pushtoDB(){
    Problem.deleteMany({}, function(){ console.log(`All deleted`)})

    for(let i=1; i<problemList.length; i++){
        const problem = new Problem({
            _id: new mongoose.Types.ObjectId(),
            judge: problemList[i].judge,
            problemID: problemList[i].problemID,
            title: problemList[i].title
        });
        problem
        .save()
        .then((result) => {
          console.log(`updated problems: ${problemList[i].judge} ${problemList[i].problemID}`);
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
}

function getProblemJudge(s){
    let judge = "";

    if(s[1] == 'T'){
        judge = "URAL";
    }
    else if(s[1]=='L' && s[2]=='O'){
        judge = "LightOJ";
    }
    else if(s[1]=='L' && s[2]=='A'){
        judge = "UVALive";
    }
    else if(s[1]=='S'){
        judge = "SPOJ";
    }
    else if(s[1]=='U'){
        judge = "UVA";
    }
    else if(s[1]=='C'){
        judge = "CodeChef";

    } else faults++;

    return judge;
}

function getProblemID(s){
    let id = "";
    for(let i=0, f=0; i<s.length && f<2; i++){
        if(s[i]==' ') f++;
        else if(s[i]==']') f++;
        else if(f) id += s[i];
    }
    if(id.length == 0) faults++;
    return id;
}

function getProblemTitle(s){
    let title = "";
    for(let i=0, f=0; i<s.length; i++){
        if(s[i]==' ' && f<2) f++;
        else if(f==2) title += s[i];
    }
    if(title.length == 0) faults++;
    return title;
}

function addProblems(problem){
    let s = problem.problems;
    problemList.push(
        { 
            judge: getProblemJudge(s),
            problemID: getProblemID(s), 
            title: getProblemTitle(s)
        }
    );
}


function printProblems(problem){
    console.log(problem.problems);
}