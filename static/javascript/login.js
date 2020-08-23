let $loginForm = $("#login-form");
let $username = $("#username");
let $password = $("#password");
let $loginBtn = $("#login-btn");

async function login(evt) {
    evt.preventDefault();
    let username = $username.val();
    let password = $password.val();
    let result = await apiLogin(username, password);

    updateHeader();
    window.location.href = '/';
}

$loginForm.on("submit", login);
updateHeader();