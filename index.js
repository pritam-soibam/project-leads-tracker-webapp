import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js"
import {
  getDatabase,
  ref /* reference in db */,
  push /* push database to db */,
  onValue /*listen to changes in db-reference */,
  remove,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js"

// firebase setup

const firebaseConfig = {
  // databaseURL: process.env.DATABASE_URL
  databaseURL: "https://leads-tracker-app-babba-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app) /* returns value Database */
const referenceInDB = ref(db, "leads") /* setup db-reference */

onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists()
  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
  }
})

// variables

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

// listeners

deleteBtn.addEventListener("dblclick", function () {
  remove(referenceInDB)
  ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value)
  inputEl.value = ""
})

inputEl.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    inputBtn.click()
  }
})

// functions

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
      <a target='_blank' href='${leads[i]}'>
      ${leads[i]}
      </a>
    </li>
    `
  }

  ulEl.innerHTML = listItems // display all list items
}
