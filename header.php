<?php
try
{
	// On se connecte à MySQL
	$pdo = new PDO('mysql:host=localhost;dbname=space-tourism-website;charset=utf8', 'root', 'root');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}
?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <title><?="Space tourism website | $title"?></title>
  <style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed&family=Barlow:wght@400;700&family=Bellefair&display=swap');
</style>

</head>
<body>
 <?php
 function headerNav($number,$link,$adress) {
  global $title;
   if($link == $title) {
    return <<<HTML
    <span class='active f-nav-text'>
      <strong>$number</strong>  
      <a href='$adress.php'> $link</a>
    </span>
HTML;

   } else {
    return <<<HTML
    <span class='f-nav-text'>
      <strong>$number</strong> 
      <a href='$adress.php'> $link</a>
    </span>
HTML;

   }
 }
  ?>
  <header>
    <div class="w-logo">
      <span><a href="index.php"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><g fill="none" fill-rule="evenodd"><circle cx="24" cy="24" r="24" fill="#FFF"/><path fill="#0B0D17" d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"/></g></svg></a></span>
    </div>
    <div class="w-nav">
      <nav>
        <?= headerNav('00', 'Home','index')?>
        <?= headerNav('01', 'Destination','destination')?>
        <?= headerNav('02', 'Crew','crew')?>
        <?= headerNav('03', 'Technology','technology')?>
      </nav>
    </div>
  </header>