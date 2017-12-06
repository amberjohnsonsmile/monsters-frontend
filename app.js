// on either submit add display:none to .add?

const apiURL = "https://damp-headland-17256.herokuapp.com/combined";

fetch(apiURL)
    .then(response => response.json())
    .then(response => {
        monstersArray = response.combined;
        appendOptions(response);
    });

document.querySelector(".fears").addEventListener("submit", event => {
    event.preventDefault();
    let input = document.querySelector("textarea").value;
    let monsterChoice = document.querySelector("select").value;
    if (monsterChoice === "slithery") {
        input = removeVowels(input);
        document.querySelector("p").textContent = input;
    } else if (monsterChoice === "scaly") {
        input = backwards(input);
        document.querySelector("p").textContent = input;
    } else if (monsterChoice === "electric") {
        input = hackerSpeak(input);
        document.querySelector("p").textContent = input;
    }
    addImage();
    document.querySelector("textarea").value = "";
    document.querySelector("label").textContent = "don't believe everything your monsters tell you";
    document.querySelector("label").style.color = "#23e393";
});

// "add monster" as <option> in menu?
    // click on it and two fields come up, ask for URL and monster name?
document.querySelector("select").addEventListener("change", event => {
    if (event.target.value === "add your own...") {
        alert("Add your own monster!");
    }
});

function appendOptions(responseObject) {
    responseObject.combined.map(item => {
        let option = document.createElement("option");
        let text = document.createTextNode(item.type);
        option.appendChild(text);
        document.querySelector("select").appendChild(option);
    });
    appendAddOption();
}

// create "add your own..." dropdown option
function appendAddOption() {
    let option = document.createElement("option");
    let text = document.createTextNode("add your own...");
    option.appendChild(text);
    document.querySelector("select").appendChild(option);
}

function addImage() {
    monstersArray.map(item => {
        if (item.type == document.querySelector("select").value) {
            document.querySelector("img").src = item.image_url;
            document.querySelector("img").style.display = "block";
        }
    });
}

// functions for word manipulation

function backwards(string) {
    let wordArray = string.split(" ");
    for (i = 0; i < wordArray.length; i++) {
        if (i % 3 === 0) {
            wordArray[i] = wordArray[i].split("").reverse().join("");
        }
    }
    wordArray = wordArray.join(" ");
    return wordArray;
}

function removeVowels(string) {
    string = string.toLowerCase();
    let newString = "";
    for (i = 0; i < string.length; i++) {
        if (string[i] !== "a" && string[i] !== "e" && string[i] !== "i" && string[i] !== "o" && string[i] !== "u") {
            newString += string[i];
        }
    }
    return newString;
}

function hackerSpeak(string) {
    string = string.toLowerCase();
    let newString = "";
    for (i = 0; i < string.length; i++) {
        if (string[i] === "o") {
            newString += "0";
        } else if (string[i] === "i") {
            newString += "1";
        } else if (string[i] === "e") {
            newString += "3";
        } else if (string[i] === "a") {
            newString += "4";
        } else if (string[i] === "s") {
            newString += "5";
        } else {
            newString += string[i];
        }
    }
    return newString;
}
