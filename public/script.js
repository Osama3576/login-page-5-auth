const toastContainer = document.getElementById('toast');

////////////////////////////////////////////////////////////////////////////////////////////////
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const checkAuthentcated = async () => {
  const res = await fetch('http://localhost:5500/');

  if (res.status === 200) {
    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 2000);
  }
  if (res.status === 401) {
    toastContainer.classList.add('show');

    setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 2000);
  }
};

checkAuthentcated();

loginBtn.addEventListener('click', () => {
  checkAuthentcated();
});
logoutBtn.addEventListener('click', () => {
  checkAuthentcated();
});
