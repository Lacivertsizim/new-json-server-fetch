let nameInp = document.querySelector("#name");
let surnameInp = document.querySelector("#surname");
let mailInp = document.querySelector("#mail");
let genderInp = document.querySelector("#gender");
let birthdayInp = document.querySelector("#birthday");
let telInp = document.querySelector("#tel");
let countryInp = document.querySelector("#country");
let cityInp = document.querySelector("#city");
let addressInp = document.querySelector("#address");

let registerBtn = document.querySelector("#register");
let updateBtn = document.querySelector("#update");

let table = document.querySelector("#tab");

let elm = "";
let allTodos = [];

async function fetchGet() {
  const response = await fetch("http://localhost:3000/posts");
  let res = await response.json();
  console.log(res);
  allTodos = res;
  showPost(res);
}
fetchGet();

async function fetchPost() {
  let data = {
    firstName: nameInp.value,
    surName: surnameInp.value,
    email: mailInp.value,
    gender: genderInp.value,
    birthday: birthdayInp.value,
    tel: telInp.value,
    country: countryInp.value,
    city: cityInp.value,
    address: addressInp.value,
  };
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let res = await response.json();
  showPost(res);
  console.log(res);
}

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  fetchPost();
});

const showPost = (posts) => {
  posts.forEach((element) => {
    let add = "<tr>";
    add +=
      "<td>" +
      element.firstName +
      "</td>" +
      "<td>" +
      element.surName +
      "</td>" +
      "<td>" +
      element.email +
      "</td>" +
      "<td>" +
      element.gender +
      "</td>" +
      "<td>" +
      element.birthday +
      "</td>" +
      "<td>" +
      element.tel +
      "</td>" +
      "<td>" +
      element.country +
      "</td>" +
      "<td>" +
      element.city +
      "</td>" +
      "<td>" +
      element.address +
      "</td>" +
      '<i class="edit" onclick="editButton(' +
      element.id +
      ')">' +
      "EDİT" + 
      " " +
      "</i>" +
      '<i class="delete" onclick="deleteButton(' +
      element.id +
      ')">' +
      "DELETE" +
      "</i>";

    add += "</tr>";
    tab.innerHTML += add;
  });
  console.log(posts);
};

deleteButton = async(id) => {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    }, 
  });
  let res = await response.json();
  console.log(res);
};

editButton = async (id) => {
  elm = allTodos.find((element) => element.id == id);
  nameInp.value = elm.firstName;
  surnameInp.value = elm.surName;
  mailInp.value = elm.email;
  genderInp.value = elm.gender;
  birthdayInp.value = elm.birthday;
  telInp.value = elm.tel;
  countryInp.value = elm.country;
  cityInp.value = elm.city;
  addressInp.value = elm.address;
  registerBtn.style.display = "none"
  updateBtn.style.display = "block"
}

updateBtn.onclick = async (event) => {
  event.preventDefault();
  let data = {
    firstName: nameInp.value,
    surName: surnameInp.value,
    email: mailInp.value,
    gender: genderInp.value,
    birthday: birthdayInp.value,
    tel: telInp.value,
    country: countryInp.value,
    city: cityInp.value,
    address: addressInp.value,
  };
  const response = await fetch(`http://localhost:3000/posts/${elm.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  registerBtn.style.display = "block"
  updateBtn.style.display = "none"
}

