function updateHeader() {
    let $navLogin = $("#nav-login");
    let $navSignup = $("#nav-signup");
    let $username = $("#nav-username");
    let $myAccount = $("#nav-myaccount");
    let $logout = $("#nav-logout");

    if (localStorage.getItem("userId")) {
        $navLogin.hide();
        $navSignup.hide();
        $username.show();
        $username.html(localStorage.getItem("username"));
        $myAccount.show();
        $logout.show();
    } else {
        $navLogin.show();
        $navSignup.show();
        $username.hide();
        $myAccount.hide();
        $logout.hide();
    }
}

$("#nav-logout").click(function () {
    // localStorage.setItem("userId", "");
    // localStorage.setItem("username", "");
    window.localStorage.clear();
    updateHeader();
    window.location.href = '/';
});

updateHeader();





