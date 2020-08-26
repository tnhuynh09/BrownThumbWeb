let $loginForm = $("#login-form");
let $username = $("#username");
let $password = $("#password");
let $loginBtn = $("#login-btn");
let $error = $("#error");

async function login(evt) {
    evt.preventDefault();
    $error.empty();
    let username = $username.val();
    let password = $password.val();
    let result = await apiLogin(username, password);

    if (result.data.errors) {
        let error = result.data.errors.errors;
        $error.append(error);
    } else {
        updateHeader();
        window.location.href = '/';
    }
}

$loginForm.on("submit", login);
updateHeader();