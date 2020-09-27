// Various constant data pieces including locations and ID regions. All global because they're integral to how it runs.
// Most of this data is public research data. The only request is that you credit SBHAX, Phase and other contributors if you reuse it.

/*
    States has, well, all the state switch functions, very useful. It gets added to by the state libraries.
*/

var states = {}

/*
    Templates list
*/

templates = {
    loading: "./template/loading.ejs",
    loadingLog: "./template/loadingLog.ejs",
    splash: "./template/splash.ejs",
    main: "./template/main.ejs",
    navbar: "./template/navbar.ejs",

    // Inner states.
    welcome: "./template/welcome.ejs",
    textures: "./template/textures.ejs"
}

/*
    Region data contains all region specific data, this includes:
        - meta - Information about the ROM. Lots of cool things.
            - isoCode - ISO standard code for the region ie JP
            - regCode - Video region code, since that's familiar for some, NTSC-J, NTSC, PAL etc.
            - name - Regional name for the game. Mainly for the japanese title.
        - offsets - Offsets for that region.
            - sheets - Sheet locations and organisation data. These are objects with name, palette, offset and layout. Thinking about maybe tossing a sprite resolution thing in there, but not now. That'd only be complete with
                       chaining multiple sheets into one view. Lets get one sheet out first, yeah?
            - Tiles - Tile information. Palettes and how they are arranged are here.
            - movedata - Movedata locations.
            - Story - Story locations. This will need definite assistance from Porog, as they're the story guy.
*/

const regionData = {
    BSBE:{
        meta:{
            isoCode:"US",
            name:"Sonic Battle",
            regCode:"NTSC-U"
        },
        offsets: {
            sheets: [
                {
                    name: "Sonic",
                    palette: 0x47AFB8,
                    offset: 0x47AFD8,
                    layout: [8, 4, 8, 4, 8, 4, 4, 4, 8, 4, 8, 8, 8, 8, 16, 12, 12, 8, 12, 8, 8, 16, 8, 12,
                        8, 8, 4, 8, 4, 4, 8, 8, 4, 8, 4, 8, 4, 4]
                },
                {
                    name: "Knuckles",
                    palette: 0x4CADD8,
                    offset: 0x4CADF8,
                    layout: [8, 4, 8, 4, 8, 4, 4, 4, 8, 4, 8, 8, 8, 12, 16, 12, 12, 8, 12, 8, 8, 8, 8, 8,
                        12, 8, 8, 4, 8, 8, 12, 8, 4, 8, 4, 4, 8, 8, 4, 8, 4, 4, 8, 4, 4],
                },
                {
                    name: "Tails",
                    palette: 0x5283F8,
                    offset: 0x528418,
                    layout: [8, 4, 8, 4, 8, 4, 4, 4, 8, 4, 8, 8, 8, 8, 28, 12, 12, 8, 8, 8, 8, 20, 8, 20,
                        16, 8, 8, 4, 8, 8, 8, 8, 4, 8, 8, 4, 8, 8, 8, 8, 8, 4, 4],
                },
                {
                    name: "Shadow",
                    palette: 0x58D818,
                    offset: 0x58D838,
                    layout: [8, 4, 28, 12, 8, 4, 4, 8, 8, 8, 4, 8, 8, 8, 12, 24, 16, 20, 8, 4, 8, 12, 12,
                        8, 24, 8, 12, 8, 4, 8, 4, 4, 8, 8, 12, 4, 4, 4, 4, 4],
                },
                {
                    name: "Rouge",
                    palette: 0x5F3E38,
                    offset: 0x5F3E58,
                    layout: [8, 4, 8, 4, 8, 4, 8, 4, 8, 4, 8, 12, 16, 12, 8, 8, 12, 8, 4, 12, 8, 4, 8, 4,
                        4, 8, 8, 12, 4, 4, 4, 4, 4],
                },
                {
                    name: "Amy",
                    palette: 0x636458,
                    offset: 0x636478,
                    layout: [8, 4, 8, 4, 8, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 16, 16, 8, 8, 12, 12, 8, 8, 8,
                        12, 8, 4, 8, 8, 8, 8, 8, 4, 4, 8, 4, 4],
                },
                {
                    name: "E-102",
                    palette: 0x681A78,
                    offset: 0x681A98,
                    layout: [8, 4, 8, 4, 4, 4, 4, 4, 4, 8, 4, 8, 8, 8, 12, 16, 12, 12, 8, 12, 8, 8, 16,
                        12, 12, 16, 12, 12, 28, 4, 4, 20, 40, 4, 8, 4, 4, 4, 4, 8, 4, 4, 8, 4, 8, 4, 4],
                },
                {
                    name: "Cream",
                    palette: 0x6F6A98,
                    offset: 0x6F6AB8,
                    layout: [8, 4, 20, 4, 4, 8, 8, 12, 8, 8, 8, 16, 8, 12, 8, 16, 12, 4, 16, 12, 4, 8, 4,
                        4],
                },
                {
                    name: "Chaos",
                    palette: 0x7336B8,
                    offset: 0x7336D8,
                    layout: [8, 4, 8, 8, 12, 4, 8, 8, 4, 8, 8, 12, 16, 16, 8, 8, 8, 8, 20, 8, 8, 12, 8, 4,
                        8, 8, 8, 8, 8, 4, 4, 8, 4, 4],
                },
                {
                    name: "Eggman",
                    palette: 0x7822D8,
                    offset: 0x7822F8,
                    layout: [4, 4, 4, 4, 4],
                }
            ]
        }
    },
    BSBP:{
        meta:{
            isoCode:"EU",
            name:"Sonic Battle",
            regCode:"PAL"
        },
    },
    BSBJ:{
        meta:{
            isoCode:"JP",
            name:"ソニック バトル",
            regCode:"NTSC-J"
        },
    },
}

// Text decoder for the ROM

const asciiDecoder = new TextDecoder('ascii');