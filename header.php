<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <title><?="Space tourism website | $title"?></title>
</head>
<body>
 <?php
 function headerNav($number,$link) {
  global $title;
   if($link == $title) {
    return "<span class='active'><a href='$link.php'>$number $link</a></span>";

   } else {
    return "<span><a href='$link.php'>$number $link</a></span>";

   }
 }
  ?>
  <header>
    <div class="w-logo">
      <span><a href="index.php"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><g fill="none" fill-rule="evenodd"><circle cx="24" cy="24" r="24" fill="#FFF"/><path fill="#0B0D17" d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"/></g></svg></a></span>
    </div>
    <div class="w-nav">
      <nav>
        <?= headerNav('00', 'Home')?>
        <?= headerNav('01', 'Destination')?>
        <?= headerNav('02', 'Crew')?>
        <?= headerNav('03', 'Technology')?>
      </nav>
    </div>
  </header>