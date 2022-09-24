# D2 Map server

This is a REST API to serve Diablo 2 maps for a given seed, difficulty, and map id.

In Diablo 2 and Diablo 2 Resurrected, the maps are randomly generated based on a seed value.
This will take that seed value (and difficulty) and use Diablo 2 (classic)'s map generation to extract collision data.

This data can then be used to render an image of the map.

This repo leverages this package - [blacha/diablo2](https://github.com/blacha/diablo2/tree/master/packages/map).
`d2-mapserver` uses a modified version of that executable to get map data.

## Installation

See [INSTALLATION.md](./INSTALLATION.md)

By default it uses port 3002. If you want to use a different port you can set a windows environment variable called `PORT`.  
Or you can open the map server in a batch file, e.g.:
```
set PORT=3113
START d2-mapserver.exe
```

### Simple instructions for Linux users:

1. Your system needs to have docker.
2. Use dockerbuild.sh to compile the docker image.
3. Start the docker container using dockerstart.sh. You need to prepare a cache directory, and D2-LoD 1.13c game files.

## Endpoints

### Map image

Returns a PNG of the given map.

```
http://localhost:3002/v1/map/:seed/:difficulty/:mapid/image
```

e.g. <http://localhost:3002/v1/map/54534535/2/49/image>

You can also add query parameters onto the URL to change the generated image

| Parameter     | Default | Description                                                             |
| :------------ | :------ | :---------------------------------------------------------------------- |
| isometric     | false   | This will make the map appear in the normal isometric perspective       |
| trim          | false   | Trims any whitespace surrounding the map image                          |
| edge          | false   | Draws the map as an outline instead of grey blocks                      |
| wallthickness | 1.0     | Only applies for edge mode, but is the wall thickness, can be a decimal |
| serverScale   | 2       | Render scaling of the map image, larger the size the bigger the image   |
| verbose       | false   | Will mark ALL objects/NPC map data on the map image, used for debugging |
| pathFinding   | true    | Turn on to draw paths between wps and exits, if you don't specify a start and end it will draw all paths |
| pathStart     | <x,y>   | This value can be 'x,y' e.g 5341,1432 or it can be 'wp' for the waypoint, or just the exit number for a specific exit |
| pathEnd       | <x,y>   | This is the same as start. Note that 'pathFinding=true' needs to be set for pathstart and end to work |

e.g. <http://localhost:3002/v1/map/54534535/2/49/image?edge=true&wallthickness=2&isometric=true>

### JSON Data

Same as above URL but without `/image`.
Returns the JSON payload used to create the map image.

```
http://localhost:3002/v1/map/:seed/:difficulty/:mapid
```

| Parameter     | Default | Description                                                             |
| :------------ | :------ | :---------------------------------------------------------------------- |
| pathFinding   | true    | Turn on to draw return path data between wps and exits, if you don't specify a start and end it will create all paths |
| pathStart     | <x,y>   | This value can be 'x,y' e.g 5341,1432 or it can be 'wp' for the waypoint, or just the exit number for a specific exit |
| pathEnd       | <x,y>   | This is the same as start. Note that 'pathFinding=true' needs to be set for pathstart and end to work |

#### Seed

- 4 byte value which is written in decimal.
  Number between 0 and 4294967295

#### Difficulty

- 0 - Normal
- 1 - Nightmare
- 2 - Hell

#### MapId

- Number between 1 and 132, for each level of Diablo 2.
  Refer to `src/static/mapRefData.json` for more info.

## Map examples

| Canyon of the Magi | Durance of Hate level 2 | Arcane Sanctuary |
| :----------------: | :---------------------: | :--------------: |
|  ![](canyon.png)   |    ![](durance2.png)    | ![](arcane.png)  |
