"use: strict";
const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const deleteStorageButton = document.querySelector(".deleteLocalStorageButton");
const removeItemLocalStorageButton = document.querySelector(
  ".removeItemLocalStorageButton"
);

const ıtemNamePlace = document.querySelector(".placeItemName");

let items = JSON.parse(localStorage.getItem("items")) || [];

const addItem = function (e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  //
  this.reset();
};

const populateList = function (plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      const allLetterLower = plate.text.toLowerCase();
      const firstLetterUp = `${allLetterLower
        .slice(0, 1)
        .toUpperCase()}${allLetterLower.slice(1, allLetterLower.length)}
              `;
      return `
              <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${
        plate.done ? "checked" : ""
      }/>
                <label for="item${i}">${firstLetterUp}</label>
              </li>
          `;
    })
    .join("");
};

const toggleDone = function (e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
};

const deleteLocalStorage = function () {
  itemsList.innerHTML = "";
  localStorage.removeItem("items");
  items = [];
};

const removeItemLocalStorage = function () {
  const textValue = ıtemNamePlace.value;
  if (!textValue) return;
  let filteredItems = items.filter((item) => item.text !== textValue);
  items = filteredItems;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
  // if (items.length === 1) itemsList.innerHTML = "";
  ıtemNamePlace.value = "";
  // const [value] = JSON.parse(filteredItems);
  // console.log(value);
};

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
deleteStorageButton.addEventListener("click", deleteLocalStorage);
removeItemLocalStorageButton.addEventListener("click", removeItemLocalStorage);

populateList(items, itemsList);
