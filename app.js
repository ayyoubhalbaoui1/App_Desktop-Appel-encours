const { app, BrowserWindow } = require("electron");
const fs = require("fs");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 1020,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile("index.html");
}

function save() {
    let number = document.getElementById("phoneno").value;
    let name = document.getElementById("name").value;
    let path = "./files/contacts.txt";

    if (fs.existsSync(path)) {

        fs.appendFile(path, name + ": " + "N°:  " + number + "<br>---------------------------------<br>" + "\n", function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("new number saved");
            }
        });
    } else {
        fs.writeFile(path, name + " " + number + " \n", (err) => {
            if (err) throw err;
            console.log("Number saved!");
        });
    }

    document.getElementById("phonenobtn").disabled = true;
    document.getElementById("newForm").reset();
}
const call = () => {
    let number = document.getElementById("phoneno").value;
    let name = document.getElementById("name").value;
    let path = "./files/recents.txt";
    var date = new Date();
    var dateStr =
        ("00" + date.getDate()).slice(-2) +
        "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear() +
        " " +
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2);

    if (fs.existsSync(path)) {

        fs.appendFile(
            path,
            name + ":" + number + " " + dateStr + "<br>---------------------------------<br>" + " \n",
            function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Calling");
                    document.getElementById("NameC").innerHTML = ` <h1><i class="fas fa-user"></i> <br> ${name }</h1> <h1> ${number}</h1>
                    
                
                    `;
                }
            }
        );
    } else {
        fs.writeFile(path, name + " " + number + " " + dateStr + "\n", (err) => {
            if (err) throw err;
            console.log("created");
            console.log("Calling");


        });
    }
};

const callsHist = () => {
    let path = "./files/recents.txt";
    if (path === undefined) {
        console.log("No file selected");
        return;
    }

    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        let histories = [];
        histories.push(data);
        console.log("The file content is : " + data);
        document.getElementById("output").innerHTML = `
    <div class="card mx-auto" style="width:70%;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item"style="background-color: #FFFF00;border-radius: 3px; text-decoration: none;">${histories.splice("  ")}</li>
    
  </ul>
</div>
    `;
    });
};
const callsConta = () => {
    let path = "./files/contacts.txt";
    if (path === undefined) {
        console.log("No file selected");
        return;
    }

    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        let contacts = [];
        contacts.push(data);
        console.log("The file content is : " + data);
        document.getElementById("ou").innerHTML = `
    <div class="card mx-auto" style="width:70%;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item"style="background-color: #FFFF00;border-radius: 3px; text-decoration: none;">${contacts.splice(" ")}</li>
    
  </ul>
</div>
    `;
    });

};


const reloadBtn = () => {
    document.getElementById("phonenobtn").disabled = false;
};

app.whenReady().then(createWindow);