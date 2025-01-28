import { employeeData } from "./data.js";

const employeeListEl = document.getElementById("employee-list");
const uniqueEmployees = [...new Set(employeeData.map((emp) => emp.name))];

uniqueEmployees.forEach((name) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<a href="#" data-name="${name}">${name}</a>`;
  employeeListEl.appendChild(listItem);
});

document.querySelectorAll("#employee-list a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const name = this.dataset.name;
    showEmployeeDetail(name);
  });
});

function showEmployeeDetail(name) {
  const detailSection = document.getElementById("employee-detail");
  const employeeNameEl = document.getElementById("employee-name");
  const employeeDataEl = document.getElementById("employee-data");
  const totalHoursEl = document.getElementById("total-hours");

  const employeeEntries = employeeData.filter((emp) => emp.name === name);

  employeeNameEl.textContent = `${name}'s Work Details`;
  employeeDataEl.innerHTML = employeeEntries
    .map((entry) => {
      return `<tr><td>${entry.date}</td><td>${entry.clockin}</td><td>${entry.clockout}</td><td>${entry.workedHours}</td></tr>  `;
    })
    .join("");

  const totalHours = employeeEntries.reduce(
    (sum, entry) => sum + entry.workedHours,
    0
  );
  totalHoursEl.textContent = `Total Worked Hours: ${totalHours}`;
  totalHoursEl.style.textAlign = "center";

  document.querySelector("#employee-list").style.display = "none";
  detailSection.style.display = "block";
}

document.getElementById("back-button").addEventListener("click", () => {
  document.getElementById("employee-detail").style.display = "none";
  document.querySelector("#employee-list").style.display = "block";
});
