//const apiURL = "https://damp-headland-17256.herokuapp.com/combined";
const apiURL = "http://localhost:3000/combined";

function fetchMonsters() {
    fetch(apiURL)
        .then(response => response.json())
        .then(response => {
            monstersArray = response.combined;
            appendOptions(response);
            appendAddOption();
        });
}

fetchMonsters();

// Refactor out some functions
document.querySelector(".fears").addEventListener("submit", event => {
    event.preventDefault();
    let input = document.querySelector("textarea").value;
    let monsterChoice = document.querySelector("select").value;
    appendFears(monsterfy(monsterChoice, input));
});

function monsterfy(monsterChoice, input) {
    switch (monsterChoice) {
        case "scaly":
            input = backwards(input);
            break;
        case "slithery":
            input = removeVowels(input);
            break;
        case "electric":
            input = hackerSpeak(input);
            break;
        default:
            input = replaceWithR(input);
            break;
    }
    return input;
}

function appendFears(input) {
    document.querySelector("p").textContent = input;
    addImage();
    document.querySelector("textarea").value = "";
    document.querySelector("label").textContent = "don't believe everything your monsters tell you";
    document.querySelector("label").style.color = "#23e393";
}

document.querySelector("select").addEventListener("change", displayMonsterForm);

function displayMonsterForm(event) {
    if (event.target.value === "add your own...") {
        document.querySelector("img").src = "";
        document.querySelector("img").alt = "";
        document.querySelector("p").textContent = "";
        document.querySelector(".add").style.display = "block";
    } else {
        document.querySelector(".add").style.display = "none";
    }
}

document.querySelector(".add").addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector(".add").style.display = "none";
    const monsterData = new FormData(event.target);
    addMonster({
        combined: {
            id: monstersArray.length + 1,
            type: monsterData.get("name"),
            image_url: monsterData.get("url"),
        }
    });
    document.querySelectorAll(".add input")[0].value = "";
    document.querySelectorAll(".add input")[1].value = "";
});

function addMonster(monster) {
    fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(monster),
        headers: new Headers ({
            "Content-Type": "application/json"
        })
    })
        .then(response => response.json())
        .then(resetOptions)
        .then(fetchMonsters)
        .catch(console.error);
}

function appendOptions(responseObject) {
    responseObject.combined.forEach(item => {
        let option = document.createElement("option");
        let text = document.createTextNode(item.type);
        option.appendChild(text);
        document.querySelector("select").appendChild(option);
    });
}

function resetOptions() {
    let options = document.querySelectorAll("option");
    for (i = 1; i < options.length; i++) {
        options[i].remove();
    }
}

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

function backwards(string) {
    let wordArray = string.split(" ");
    let newArray = [];
    wordArray.reduce((newArray, word) => {
        if (wordArray.indexOf(word) % 2 === 0) {
          newArray.push(word.split("").reverse().join(""));
        } else {
          newArray.push(word);
        }
        return newArray;
    }, newArray);
    return newArray.join(" ");
}

function removeVowels(string) {
    let vowels = /[aeiou]/g;
    return string.toLowerCase().replace(vowels, "");
}

function hackerSpeak(string) {
    string = string.toLowerCase();
    let newString = "";
    for (i = 0; i < string.length; i++) {
        switch (string[i]) {
            case "o":
                newString += "0";
                break;
            case "i":
                newString += "1";
                break;
            case "e":
                newString += "3";
                break;
            case "a":
                newString += "4";
                break;
            case "s":
                newString += "5";
                break;
            default:
                newString += string[i];
                break;
        }
    }
    return newString;
}

function replaceWithR(string) {
    string = string.toUpperCase();
    let newString = "";
    for (i = 0; i < string.length; i++) {
        if (string[i] !== "A" && string[i] !== "E" && string[i] !== "I" && string[i] !== "O" && string[i] !== "U") {
            newString += string[i];
        } else {
            newString += "R";
        }
    }
    return newString;
}
