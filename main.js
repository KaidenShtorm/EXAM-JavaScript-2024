const input = document.getElementById("inputField");
const addContent = document.querySelector(".add");
const showContent = document.querySelector(".displayForOutput");
const warningMessage = document.querySelector(".warning-message");
const sortByNameContent = document.querySelector(".sortByName");
const sortByValueContent = document.querySelector(".sortByValue");
const deleteButton = document.querySelector(".deletePost");


let newArray = [];


let selectSomeElement = false;


function displayWarningContentOnPage() {
    warningMessage.textContent = "Please enter a valid Name/Value Pair.";
    setTimeout(() => {
        warningMessage.textContent = "";
    }, 3000);
    input.value = "";
}


addContent.addEventListener("click", () => {
    const inputValue = input.value.trim();
    const splitEqually = inputValue.split("=").map(item => {
        if (item.length >= 1) {
            return item.trim();
        } else {
            displayWarningContentOnPage();
        }
    });

    if (splitEqually.length - 1 === 1) {
        input.value = "";
        let isValidValue = true;

        for (const everySymbol of inputValue) {
            if (!(everySymbol.toUpperCase() !== everySymbol.toLowerCase()) &&
                isNaN(Number(everySymbol)) &&
                everySymbol !== "="
            ) {
                isValidValue = false;
                displayWarningContentOnPage()
                break;
            }
        }

        if (isValidValue) {
            newArray.unshift(inputValue);
            showContent.textContent = "";
            const ulElements = document.createElement("ul");
            ulElements.classList.add("listOfItems");
            showContent.appendChild(ulElements);

            newArray.forEach(item => {
                const listOfItem = document.createElement("li");
                listOfItem.textContent = item;
                showContent.appendChild(listOfItem);
            });
        } else {
            displayWarningContentOnPage()
        }
    } else {
        displayWarningContentOnPage();
    }
});


sortByNameContent.addEventListener("click", () => {
    const sortedArray = [...newArray].sort((a, b) => {
        const firstElement = a.split("=")[0].trim();
        const secondElement = b.split("=")[0].trim();
        return firstElement.localeCompare(secondElement);
    });
    showContent.textContent = "";
    const ulElements = document.createElement("ul");
    showContent.appendChild(ulElements);

    sortedArray.forEach(item => {
        const listOfItem = document.createElement("li");
        listOfItem.textContent = item;
        ulElements.appendChild(listOfItem);
    });
});


sortByValueContent.addEventListener("click", () => {
    const sortedArray = [...newArray].sort((a, b) => {
        const firstElement = a.split("=")[1].trim();
        const secondElement = b.split("=")[1].trim();
        return firstElement.localeCompare(secondElement);
    });
    showContent.textContent = "";
    const ulElements = document.createElement("ul");
    showContent.appendChild(ulElements);

    sortedArray.forEach(item => {
        const listOfItem = document.createElement("li");
        listOfItem.textContent = item;
        ulElements.appendChild(listOfItem);
    });
});


showContent.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        if (selectSomeElement) {
            selectSomeElement.classList.remove("selectSomeElement");
        }
        selectSomeElement = event.target;
        selectSomeElement.classList.add("selectSomeElement");
    }
});


deleteButton.addEventListener("click", () => {
    if (selectSomeElement) {
        selectSomeElement.remove();
        selectSomeElement = false;
    } else {
        displayWarningContentOnPage()
    }
});






