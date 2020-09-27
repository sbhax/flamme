# Flamme

Flamme is a work in progress editor for Sonic Battle. The aim is flexibility, with an end goal to go beyond supporting just Sonic Battle (But that's our scope for now).

### Why?

- SBHS suffers problems as a result of being 3 years old and being pretty much abandoned (it's current features are complete, but they're not comprehensive.).

- BunnySuit is generally unfriendly to use.

- Both SBHS and BunnySuit rely on runtimes that need to be preinstalled to run, which prevents use of them on some platforms where these runtimes do not exist.

- Both have absolutely zero mobile support. A lot of our modders are on mobile, so this hinders them greatly.

- SBHS cuts into the sheet to store the palette, which renders the top left 16 pixels in a row unusable.

- SBHS cannot edit other region roms and cannot edit images that aren't sheets.

## Contributing

- Read the room: Follow similar levels of code complexity laid out in the code already, and follow conventions that seem to appear unless they're notably damaging (if so, do an issue report!)

- Modularity: Do not just append code onto other scripts if it's not directly relevant.

## Testing

Flamme can be tested at https://sbhax.github.io/flamme/ . Please be aware that it's not even really functional as of current, soon we'll be adding indicators to the menu options to indicate their current state of usability, but I want to do this in conjuction with more modularity on the navbar ie tying it to the globals js file rom list a la a navbar property with function calls.