@echo off
(for /f "delims=" %%a in ('dir /b /a-d scripts\*.gs') do (
    type "scripts\*%%~a"
    echo(
  )
) > data.txt

copy data.txt data.gs

REM type scripts\*.gs > data.txt
