# Running your own map server

There are two ways to run the map server, the easy way (this page) or using docker, see [DOCKERSERVER.md](./DOCKERSERVER.md)

**NOTE**: You don't need to run this on a dedicated server, it's just software you can run on your own PC.

## Installation

You can find the latest version here:
https://github.com/joffreybesos/d2-mapserver/releases/latest

- Download the `d2-mapserver-vxxx.zip` file from the above link.
- Extract the zip file to it's own folder.
- Download the D2 LoD game files - [zip download link](https://mega.nz/file/EgdmXT7C#sRNJGN-QlB24-9jqaI5DBWgFrbCw0Bezj-S0aY_Jn6k).
- Extract the D2 LoD game files to a folder called `game` in your `d2-mapserver` folder  
    Your files should look like this:  
    ![](gamefiles.png)  
- Double click the `d2-mapserver.exe` executable  

You should see a window popup with the text `Running on http://localhost:3002`  
If you see this then the map server is running.  
Minimize this window, if you close it the map server will stop.  

You should then be able to access this URL in your browser <http://localhost:3002/v1/map/12345/2/117/image>  


### Configure the Map Hack

Download the latest version here:
<https://github.com/joffreybesos/d2r-mapview/releases/latest>

- Download the `d2r-v2.x.x.exe` and `settings.ini` files
- Edit the `settings.ini` file change the baseUrl setting to `baseUrl=http://localhost:3002`  

Now you can start D2R and then run the `d2rmap-v2.x.x.exe` after you start the game.

