<?php
    require_once "../chapters-class/chapter.php";
    session_start(); // Start the session

    switch($_GET['name']){
        case "arg1810":
            $_SESSION["chapterName"] = $_GET['name'];
            $_SESSION["currentScreen"] = $_GET['currentScreen'];
            break;
        default: die(); // Si no existe el capítulo, no avanza.
    }

    $chapter = new chapter($_SESSION["chapterName"], $_SESSION["currentScreen"]);
    $dialogue = $chapter->getDialogue();
    $character = $chapter->getCharacter();
    $background = $chapter->getBackground();

    $elements = array($character, $dialogue, $background);
    echo json_encode($elements);
?>