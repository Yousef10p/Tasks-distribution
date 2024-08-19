window.onload = constructTable;


// program test items ---------------------------------------------------------------------------------------------------------
let probability = [10, 10, 30, 20, 30];
let loadsOfTasks;
let startInterval;
              
const arrayOftasks = [{ load: 100, category: 'A' }, { load: 80, category: 'B' }, { load: 70, category: 'C' }, { load: 40, category: 'D' }, { load: 20, category: 'E' }];
const arrayOfEmp = [{ id: 1, tasks: [], currentLoad: 0 }, { id: 2, tasks: [], currentLoad: 0 }, { id: 3, tasks: [], currentLoad: 0 }, { id: 4, tasks: [], currentLoad: 0 }, { id: 5, tasks: [], currentLoad: 0 }]

const tableEntry = document.querySelectorAll('table')[1].querySelector('tbody');
const inputs = document.querySelectorAll('input');
const submitLoadProb = document.querySelectorAll('button')[0];
const start = document.querySelectorAll('button')[1];
const pause = document.querySelectorAll('button')[2];
const clear = document.querySelectorAll('button')[3];


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const assignTasks = (task) => {

    let min = (arrayOfEmp[0].currentLoad * 0.15) + (arrayOfEmp[0].tasks.length * 0.85), obj = arrayOfEmp[0];
    arrayOfEmp.forEach((emp, index) => {
        if (index == 0) { }
        else {
            if ((emp.currentLoad * 0.15) + (emp.tasks.length * 0.85) < min) {
                min = (emp.currentLoad * 0.15) + (emp.tasks.length * 0.85);
                obj = emp;
            }
        }
    })

    obj.tasks.push(task);
    obj.currentLoad += task.load;


    //test item 
    updateTable(obj);
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



function constructTable() {
    tableEntry.innerHTML = ``;

    arrayOfEmp.forEach(emp => {
        tableEntry.innerHTML += `
        <tr id=e${emp.id}>
      <th>${emp.id}</th>
      <td></td>
        </tr>
        `
    })
}

function updateTable(obj) {
    let temp = [];
    obj.tasks.forEach(task => {
        temp.push(task.category);
    })

    document.querySelector(`#e${obj.id}`).querySelector('td').innerHTML = temp;

}


submitLoadProb.addEventListener('click', () => {
    let temp = [];
    inputs.forEach(input => {
        temp.push(parseInt(input.value, 10));
    })
        
    
    loadsOfTasks = [temp[0], temp[1], temp[2], temp[3], temp[4]];
    probability = [temp[5], temp[6], temp[7], temp[8], temp[9]];
    
    arrayOftasks.forEach((task,index) => {
        task.load = loadsOfTasks[index];
    })    
})

start.addEventListener('click', () => {
    
        startInterval = setInterval(() => {
            let index;
            let r = 1 + Math.random() * 100;//get random number in range 1 => 100
            if (r <= (probability[0]))
                index = 0;
            else if (r <= (probability[0] + probability[1]))
                index = 1;
            else if (r <= (probability[0] + probability[1] + probability[2]))
                index = 2;
            else if (r <= (probability[0] + probability[1] + probability[2] + probability[3]))
                index = 3;
            else
                index = 4;

            assignTasks(arrayOftasks[index]);
        }, 2000);
        
        start.remove()
    
})

pause.addEventListener('click', () => {
    if (pause.innerHTML == 'Pause') {
        clearInterval(startInterval);
        pause.innerHTML = 'Resume';
    }
    else {
        startInterval = setInterval(() => {
            let index;
            let r = 1 + Math.random() * 100;//get random number in range 1 => 100
            if (r <= (probability[0]))
                index = 0;
            else if (r <= (probability[0] + probability[1]))
                index = 1;
            else if (r <= (probability[0] + probability[1] + probability[2]))
                index = 2;
            else if (r <= (probability[0] + probability[1] + probability[2] + probability[3]))
                index = 3;
            else
                index = 4;

            assignTasks(arrayOftasks[index]);
        }, 2000);
        pause.innerHTML = 'Pause';
    }
})


clear.addEventListener('click', () => {
    location.reload();
})

