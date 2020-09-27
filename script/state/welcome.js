states.welcome = function(version = "unknown"){
    navbarUpdate("nb-welcome")
    getById('main').innerHTML = render(templates.welcome, {version: "Early"})
}