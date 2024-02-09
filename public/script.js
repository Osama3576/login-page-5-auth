const toastContainer = document.getElementById('toast');

console.log(document.location.href);
console.log(window);
////////////////////////////////////////////////////////////////////////////////////////////////
// Select the login form and store its data in an object
// var data = {
//   username: document.getElementById('username').value,
//   password: document.getElementById('password').value,
// };

// // Create a new XMLHttpRequest object
// var xhr = new XMLHttpRequest();

// // Open the xhr object with the method, URL, and async parameters
// xhr.open('POST', 'http://localhost:5500/login/pasword', true);

// // Send the xhr object with the data object converted to JSON string
// xhr.send(JSON.stringify(data));

// // Define the onreadystatechange event handler for the xhr object
// xhr.onreadystatechange = function () {
//   // Check if the request is completed and successful
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     // Parse the response from the server
//     var response = JSON.parse(xhr.responseText);

//     // Check the flag or message from the response
//     if (response.success) {
//       toastContainer.classList.add('show');

//       setTimeout(() => {
//         toastContainer.classList.remove('show');
//       }, 2000);
//     } else {
//       // Show an error toast message
//       //   toastr.error(response.message);
//       console.log(response.message);
//     }
//   }
// };

////////////////////////////////////////////////////////////////////////////////////////////////
// const loginBtn = document.getElementById('login-btn');
// const logoutBtn = document.getElementById('logout-btn');

// const checkAuthentcated = async () => {
//   const res = await fetch('http://localhost:5500/');

//   if (res.status === 200) {
//     toastContainer.classList.add('show');

//     setTimeout(() => {
//       toastContainer.classList.remove('show');
//     }, 2000);
//   }
//   if (res.status === 401) {
//     toastContainer.classList.add('show');

//     setTimeout(() => {
//       toastContainer.classList.remove('show');
//     }, 2000);
//   }
// };

// checkAuthentcated();

// loginBtn.addEventListener('click', () => {
//   checkAuthentcated();
// });
// logoutBtn.addEventListener('click', () => {
//   checkAuthentcated();
// });
