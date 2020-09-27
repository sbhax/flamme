states.textures = function(version = "unknown"){
    navbarUpdate("nb-textures")
    getById('main').innerHTML = render(templates.textures)

    // Right so this is some potentially awful tile reading code, just to test things. This is prone to constant reorganisation.

    // hElPeR fUnCtIoNs!

    // Produces a mask with bit 'bit' set to 1 and the rest 0
    function createMask(bit){
        return 1 << bit
    }

    // Returns true or false based on the value of bit at index n
    function checkBit(number, bit){
        return !!(number & createMask(bit) != 0) // If the result of the masked bit is not 0 in bool format.
    }

    // Gets some bits from a number ie (0 - (12) - 3) or (4 - (56) - 7)
    function getBits(number, start, end){
        // So we need to shift it first, then mask it to remove the remainder of bytes.

        /*
            Example scenario
            We have 0101101110 and we want just the digits before the last 2, 4 digits after that in fact, so 0110:
                number = b0101101110
                 start = 4
                   end = 7

            x marks lost data (usually desirable here)

            0101101110 
             >> 010110 xxxx - Shift 4 (Start) bits right
                xx0110 xxxx - Mask with 001111, which is 1 repeated for the length of the desired sub. Length is end - start, so here it's 7 - 4 = 4, due to 0 index we need to add 1 too.

            Can you tell that this is my first attempt with binary operators? 
        */

        // Shift
        number = number >> start

        // console.log(number.toString(2))
        
        let mask = parseInt('1'.repeat(end - start + 1), 2)

        // console.log(mask.toString(2))

        return number & mask 
    }

    // Actual test
    function readTile(romData, address){
        let bytes = romData.slice(address, address + 0x20) // This should encompass the entire tile

        console.log(bytes)

        let values = [] // Dumping ground

        for (let i = 0; i < bytes.length; i++) {
            // I could double the loop but not now, lets keep it byte by byte
            values.push(getBits(bytes[i], 0, 3))
            values.push(getBits(bytes[i], 4, 7))
            // console.log(i)
        }

        return values
    }

    let tiles = []

    for (let i = 0; i < 36; i++) {
        console.log("Tile: " + i)
        tiles.push( readTile(rom, regionData.BSBE.offsets.sheets[0].offset + (0x20 * i)) )
    }

    console.log(tiles)

    // Time to create an image from that...

    // Custom palette thing, just for now.
    // https://lospec.com/palette-list/resurrect-64
    const palette = [
        [0xfd, 0xcb, 0xb0, 0xFF],

        [0xff, 0xff, 0xff, 0xFF],
        [0xc7, 0xdc, 0xd0, 0xFF],
        [0x9b, 0xab, 0xb2, 0xFF],
        [0x7f, 0x70, 0x8a, 0xFF],

        [0x8f, 0xd3, 0xff, 0xFF],
        [0x4d, 0x9b, 0xe6, 0xFF],
        [0x4d, 0x65, 0xb4, 0xFF],
        [0x48, 0x4a, 0x77, 0xFF],

        [0xfd, 0xcb, 0xb0, 0xFF],
        [0xfc, 0xa7, 0x90, 0xFF],
        [0xf6, 0x81, 0x81, 0xFF],

        [0xf0, 0x4f, 0x78, 0xFF],
        [0xc3, 0x24, 0x54, 0xFF],

        [0xf9, 0xc2, 0x2b, 0xFF],
        [0x1e, 0xbc, 0x73, 0xFF]
    ]

    const res = [6, 6]

    let buffer = new Uint8ClampedArray(( (res[0] * 8) * (res[1] * 8) ) * 4); // have enough bytes

    for (let tileY = 0; tileY < res[1]; tileY++) {
        for (let tileX = 0; tileX < res[0]; tileX++) {
            /* 
                00 01 02 03 04 05 06 07
                08 09 10 11 12 13 14 15 - Offset by 8 ie 08 takes the x position of 07 - floor(8/8) = 1
                                          so we want to math floor and offset it.
                Current tile is y * res[0] + x

                God this feels galaxy brain, but basically we want an x origin and a y origin (tileX * 8, tileY * 8)

                For each tileY unit, we offset by 8*res[0], this is to progress a row.

                For every 8 pixels of a tile we do, we need to offset again by 8*res[0].

                I fear this, but hey it's written down now so... *shrugs*
            */

            let tile = (tileY * res[0]) + tileX
            console.log("TILE: " + tile + " - " + tileX + ", " + tileY)

            for (let pixel = 0; pixel < 8*8; pixel++){
                let position = [
                    (tileX*8) + (pixel - (Math.floor(pixel/8)*8)),
                    (tileY*8) + Math.floor(pixel/8)
                ]

                //console.log("Current: " + tile + " - " + position[0] + ", " + position[1])

                position = (position[0] + ( position[1] * (res[0]*8) )) * 4

                // Set to palette
                let colour = palette[tiles[tile][pixel]]

                buffer[position + 0] = colour[0]
                buffer[position + 1] = colour[1]
                buffer[position + 2] = colour[2]
                buffer[position + 3] = colour[3]
            }
        }
    }

    // create off-screen canvas element
    let canvas = document.createElement('canvas')

    console.log(canvas)

    ctx = canvas.getContext('2d');

    canvas.width = res[0]*8;
    canvas.height = res[1]*8;

    // create imageData object
    let idata = ctx.createImageData(res[0]*8, res[1]*8);

    // set our buffer as source
    idata.data.set(buffer);

    // update canvas with new data
    ctx.putImageData(idata, 0, 0);

    getById("currentSheet").src = canvas.toDataURL()
        
}