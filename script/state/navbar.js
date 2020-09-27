/* 
    This has to be loaded before all other states. 
    
    This adds the 'navbarInitialise' function and 'navbarUpdate' function. Navbar update
    adds an underline class to the current state on switch, and initialise adds functions.

    Initialise is called after the first instance of the navbar and sets up all the buttons. Cool!
*/

function navbarInitialise(){
    getById('nb-welcome').addEventListener("click", function(){states.welcome()}, false)
    getById('nb-textures').addEventListener("click", function(){states.textures()}, false)
}

function navbarUpdate(id){
    var element = getById('navbar')
    console.log(element)
    var children = element.children;

    for (var i = 0; i < children.length; i++) {
        var current = children[i];

        if (current.id == id){
            current.classList.add("nbSelected");
        } else {
            current.classList.remove("nbSelected")
        }
    }
}