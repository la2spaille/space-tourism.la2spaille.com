<?php
$json = file_get_contents("data.json") ;
global $data;
$data = json_decode($json,true);
?>
<!DOCTYPE html>
<html lang="en">
<head>

    <link rel="preload" href="assets/home/background-home-desktop.jpg" as="image">
    <link rel="preload" href="assets/home/background-home-tablet.jpg" as="image">
    <link rel="preload" href="assets/home/background-home-mobile.jpg" as="image">

    <link rel="preload" href="assets/destination/background-destination-desktop.jpg" as="image">
    <link rel="preload" href="assets/destination/background-destination-tablet.jpg" as="image">
    <link rel="preload" href="assets/destination/background-destination-mobile.jpg" as="image">

    <link rel="preload" href="assets/crew/background-crew-desktop.jpg" as="image">
    <link rel="preload" href="assets/crew/background-crew-tablet.jpg" as="image">
    <link rel="preload" href="assets/crew/background-crew-mobile.jpg" as="image">

    <link rel="preload" href="assets/technology/background-technology-desktop.jpg" as="image">
    <link rel="preload" href="assets/technology/background-technology-tablet.jpg" as="image">
    <link rel="preload" href="assets/technology/background-technology-mobile.jpg" as="image">

  <meta charset="UTF-8">
  <link rel="shortcut icon" href="/assets/512.png" type="image/x-icon">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#0B0D17"/>
  <link rel="stylesheet" href="css/style.css">
  <link rel="manifest" href="manifest.json">
    <meta name="description" content="A Frontend Mentor challenge made with a touch of creativity">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <script>
    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
      }
    })
  </script>
  <title><?="Space tourism website"?></title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed&family=Barlow:wght@400;700&family=Bellefair&display=swap');
  </style>

</head>
<body>
<main>
  
 <?php
 function headerNav($id,$link,$adress) {
  global $title;
   if($link == $title) {
    return <<<HTML
    <span class='active link-hover'>
      <a data-id="$id" href='$adress' class="link header"> $link</a>
    </span>
HTML;

   } else {
    return <<<HTML
    <span class='link-hover'>
      <a data-id="$id" href='$adress' class="link header"> $link</a>
    </span>
HTML;

   }
 }
  ?>
  <header>
    <div class="w-logo">
      <span><a class="link-hover" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><g fill="none" fill-rule="evenodd"><circle cx="24" cy="24" r="24" fill="#FFF"/><path fill="#0B0D17" d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"/></g></svg></a></span>
    </div>
    <div class="w-nav">
      <div class="w-close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21"><g fill="#D0D6F9" fill-rule="evenodd"><path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z"/><path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z"/></g></svg>
      </div>
      <nav class="f-nav-text">
        <?= headerNav('00', 'Home','/')?>
        <?= headerNav('01', 'Destination','destination')?>
        <?= headerNav('02', 'Crew','crew')?>
        <?= headerNav('03', 'Technology','technology')?>
      </nav>
    </div>
    <div class="w-menu-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21"><g fill="#D0D6F9" fill-rule="evenodd"><path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z"/></g></svg>
    </div>
  </header>