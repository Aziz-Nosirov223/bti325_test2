const fs = require('fs');
let students = [];
let CPA_students = [];
let highestGPAStudent = [];
module.exports.prepare = function() {
    return new Promise((resolve, reject) => {
        fs.readFile('./students.json', (err, data) => {
            if (err) {
                reject("Unable to read file!");
            }

            students = JSON.parse(data);
            resolve();


        });
    })
};

module.exports.getCPA = () => {
    
    return new Promise((resolve, reject) => {

        for (let i = 0; i < students.length; i++) {
            if (students[i].program == 'CPA') {
                CPA_students.push(students[i]);
                
            }
            
        }

        if (CPA_students.length == 0) {
            reject("no results returned");
        }

        
            resolve(CPA_students);
    
    })
}

module.exports.highGPA = () => {
    
   // let name;
    return new Promise((resolve, reject) => {
        let highestGpa = 4.0;
        for (let i = 0; i < students.length; i++) {
            if (highestGpa == students[i].gpa) {
     //           highestGPAStudent.push(students[i]);
     
                resolve(students[i]);
            }
            
        }

        

        reject("Failed finding the student with the highest GPA");

    })
}