/*
    Main.js handles post-global initialisation and the first steps of user interaction (Loading the splash).

    As such, this is where the ROM data is initialised and used as a global (because everywhere needs it).
*/

// Initialise our 'core' things.
let rom = null;
let romData = {

}

// Grab our templates. This will always be passed into our render function.

async function loadTemplates(){
    for (template in templates){
        console.log("Retrieving " + template + " at " + templates[template])
        templates[template] = await makeRequest("GET", templates[template])
    }
}

// Quick function to add and render the log
function updateLog(log, item){
    log.unshift(item)
    getById("loadingLog").innerHTML = render(templates.loadingLog, {log:log})
}

// Deal with the splash and obtaining files after the templates are loaded.
loadTemplates().then(() => {
    states.splash()
})