'use strict'

// Fetch the items from the JSON file
function loadItems() {
  return fetch('assets/data/data.json')
    .then((response) => response.json())
    .then((json) => json.items)
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items')
  container.innerHTML = items.map((item) => createHTMLString(item)).join('')
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li>
    <img src="${item.img}" alt="${item.type}" />
    <span>${item.gender}, ${item.size} size</span>
  </li>
  `
}

// Handle button click
function onButtonClick(event, items) {
  const dataset = event.target.dataset
  const key = dataset.key
  const value = dataset.value
  if (key == null || value == null) {
    return
  }
  displayItems(items.filter((item) => item[key] === value))
  //updateItems(items, key, value)
}

// Make the items matching {key: value} invisible.
/*function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible')
    } else {
      item.classList.add('invisible')
    }
  })
}*/

function setEventListeners(items) {
  const logo = document.querySelector('.logo')
  const menu = document.querySelector('.menu')
  logo.addEventListener('click', () => displayItems(items))
  menu.addEventListener('click', (event) => onButtonClick(event, items))
}

// main
loadItems()
  .then((items) => {
    displayItems(items)
    setEventListeners(items)
  })
  .catch(console.log)
