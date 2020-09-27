states.splash = function(error){
    getById('container').innerHTML = render(templates.splash, {error: error})
    getById('romInput').addEventListener("change", loadROM, false)
}

async function loadROM() {

    // Loading screen
    container.innerHTML = render(templates.loading)

    // Actually load
    let loadingLog = []

    updateLog(loadingLog, 'Reading ROM... (' + Math.floor((this.files[0].size/1024/1024)*100)/100 + 'MB)')

    // I'm a Deno user, the Uint8Array is familiar to me. It's also really useful for modifying ROMs.
    rom = new Uint8Array(await this.files[0].arrayBuffer())

    updateLog(loadingLog, 'Successfully read ROM')

    updateLog(loadingLog, 'Finding region...')

    // Remember you gotta offset the slice by 1 because JS lol. This is the location of the game ID.
    romData.id = asciiDecoder.decode(rom.slice(0xAC, 0xAF + 0x01))

    if (!regionData[romData.id]) {
        // Not Sonic Battle
        states.splash("[ ! ] Game ID " + romData.id + " isn't Sonic Battle. Make sure the ROM is correct and it is of the game.")
    } else {
        // It's Sonic Battle

        updateLog(loadingLog, "Region found: " + regionData[romData.id].meta.name + " (" + regionData[romData.id].meta.isoCode + ", " + romData.id + ")")

        // Initialise the site.
        getById('container').innerHTML = render(templates.main)
        navbarInitialise()

        // Open welcome        
        states.welcome()
    }
}