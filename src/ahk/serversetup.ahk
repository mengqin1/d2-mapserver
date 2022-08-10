#SingleInstance Force
SetWorkingDir, %A_ScriptDir%

if (InStr(A_ScriptDir, "Program Files")) {
    Msgbox, 16, Error, You have placed your MH files in Program Files.`nPlease move your files them to a different folder.
    ExitApp
}

if (InStr(A_ScriptDir, "\Desktop")) {
    Msgbox, 16, Error, You have placed your MH files on your Desktop.`nPlease move your files to a different folder.
    ExitApp
}


try {
    WriteLog("Performing map server health check...", logfile)
    healthCheck(testUrl)
    WriteLog("Found map server running", logfile)
} catch e {
    WriteLog("No mapserver running", logfile)
}

if !A_IsAdmin
    Run, % "*RunAs " (A_IsCompiled ? "" : A_AhkPath " ") Chr(34) A_ScriptFullPath Chr(34)

logfile = serverlog.txt
FileDelete, %logfile%
; kill any currently running mapserver processes
Runwait, taskkill /im d2-mapserver.exe /f,, Hide
Runwait, taskkill /im node.exe /f,, Hide
WriteLog("Killed processes", logfile)

try {
    WriteLog("Check for running server...", logfile)
    healthCheck(testUrl)
    WriteLog("Found map server running", logfile)
} catch e {
    WriteLog("No mapserver running", logfile)
}

; delete any temp files
FileRemoveDir, %A_Temp%\pkg, 1
WriteLog("Deleted temp files", logfile)

; add the folder to the windows defender exclusion list (this requires admin)
Run, powershell -inputformat none -outputformat none -NonInteractive -Command Add-MpPreference -ExclusionPath '%A_ScriptDir%',, Hide
WriteLog("Added defender exception", logfile)


RegWrite, REG_SZ, HKEY_CURRENT_USER\SOFTWARE\Blizzard Entertainment\Diablo II, InstallPath,


; test that map generation works
exePath = %A_ScriptDir%/bin/d2-map.exe
d2path = game
cmd := exePath " """ d2path """ --seed " seed " --difficulty " difficulty " --map 1 --verbose >> " logfile
WriteLog("Run " cmd, logfile)
RunWait, %comspec% /c %cmd%,,hide
WriteLog("Tested generating map data", logfile)

; test that the mapserver works
mapserverExePath = %A_ScriptDir%/d2-mapserver.exe
cmd := mapserverExePath " >> " logfile
Run, %comspec% /c %cmd%,,hide
WriteLog("Starting map server...", logfile)
WriteLog("Run " cmd, logfile)
Loop, 30
{
    Sleep, 1000
    FileRead, testresults, %logfile%
    if (InStr(testresults, "Running on http")) {
        break
    }
}

if (!InStr(testresults, "Running on http")) {
    WriteLog("Could not start map server", logfile)
    Msgbox, 16, Error, Something is wrong with your d2-mapserver setup`n`nSend serverlog.txt to the discord for help`n`nOther things you can try:`n - Restart your PC (some say this helps)`n - Move all the files to a different folder`n - Try the 'Run from source' guide on the wiki`n - Ensure Antivirus isn't intefering`n - Ensure other programs like OneDrive aren't interfering
} else {
    WriteLog("Everything successful", logfile)
    Msgbox, 0, Success, Everything seems to be working!`nMap server is started in the background`nYou can now start D2R and the map hack
}




WriteLog(text, file) {
	FormatTime, vDate,, yyyy-MM-dd HH-mm-ss ;24-hour
	FileAppend, % vDate ": " text "`n", %file% ; can provide a full path to write to another directory
    OutputDebug, % text
}


healthCheck(testUrl) {
    whr := ComObjCreate("WinHttp.WinHttpRequest.5.1")
    WinHttpReq.SetTimeouts("10", "10", "10", "10")
    whr.Open("GET", testUrl, true)
    whr.Send()
    whr.WaitForResponse()
    ;healthCheck := whr.ResponseText
}