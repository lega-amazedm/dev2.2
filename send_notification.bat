@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

:: Set colors
set "SUCCESS_COLOR=92"
set "ERROR_COLOR=91"
set "INFO_COLOR=94"
set "WARNING_COLOR=93"
set "DEFAULT_COLOR=0"

:: Clear screen and show header
cls
echo [%SUCCESS_COLOR%mDevBotCreator - Система уведомлений%DEFAULT_COLOR%m
echo [%SUCCESS_COLOR%m================================%DEFAULT_COLOR%m
echo.

:: Get notification type
:type_menu
echo [%INFO_COLOR%mВыберите тип уведомления:%DEFAULT_COLOR%m
echo [%INFO_COLOR%m1. Успех (success)%DEFAULT_COLOR%m
echo [%INFO_COLOR%m2. Ошибка (error)%DEFAULT_COLOR%m
echo [%INFO_COLOR%m3. Информация (info)%DEFAULT_COLOR%m
echo [%INFO_COLOR%m4. Предупреждение (warning)%DEFAULT_COLOR%m
echo.
set /p choice="Ваш выбор (1-4): "

if "%choice%"=="1" set "type=success" && set "color=%SUCCESS_COLOR%"
if "%choice%"=="2" set "type=error" && set "color=%ERROR_COLOR%"
if "%choice%"=="3" set "type=info" && set "color=%INFO_COLOR%"
if "%choice%"=="4" set "type=warning" && set "color=%WARNING_COLOR%"

if not defined type (
    echo [%ERROR_COLOR%mНеверный выбор! Попробуйте снова.%DEFAULT_COLOR%m
    echo.
    goto type_menu
)

:: Get notification message
echo.
set /p message="Введите текст уведомления: "

:: Validate message
if "%message%"=="" (
    echo [%ERROR_COLOR%mОшибка: Текст уведомления не может быть пустым!%DEFAULT_COLOR%m
    echo.
    pause
    exit /b 1
)

echo.
echo [%color%mОтправка уведомления...%DEFAULT_COLOR%m
echo.

:: Send notification
curl -X POST http://localhost:3000/api/notifications ^
-H "Content-Type: application/json" ^
-d "{\"type\":\"%type%\",\"message\":\"%message%\"}"

if %errorlevel% neq 0 (
    echo [%ERROR_COLOR%mОшибка при отправке уведомления! Проверьте подключение к серверу.%DEFAULT_COLOR%m
) else (
    echo.
    echo [%SUCCESS_COLOR%mУведомление успешно отправлено!%DEFAULT_COLOR%m
)

echo.
pause 