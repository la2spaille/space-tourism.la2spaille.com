<?php
$title = "Crew";
require('header.php') ?>
<?php
$sql = 'SELECT * FROM crew';
$t_crew = $pdo->prepare($sql);
$t_crew->execute();
$crews = $t_crew->fetchAll();
?>
<main id="app">
  <h3 class="w-page-title f-heading5">
    <strong>02</strong>
    <span class="">Meet your crew</span>
  </h3>
  <div class="l-wrapper">
    <div class="w-text crew">
      <div class="w-crew-job f-heading4">
        <?php foreach ($crews as $crew) { ?>
          <span class="js-crew-job"><?= $crew['job'] ?></span>
        <?php } ?>
      </div>
      <h1 class="w-crew-name f-heading3">
        <?php foreach ($crews as $crew) { ?>
          <span class="js-crew-name"><?= $crew['name'] ?></span>
        <?php } ?>
      </h1>
      <p class="w-crew-description body-copy f-body-copy">
        <?php foreach ($crews as $crew) { ?>
          <span class="js-crew-description"><?= $crew['description'] ?></span>
        <?php } ?>
      </p>
      <div class="w-crew-nav">
        <span class="js-crew-nav"></span><span class="js-crew-nav"></span><span class="js-crew-nav"></span><span class="js-crew-nav"></span>
      </div>
    </div>
    <div class="w-img-wrapper crew">
      <img class="js-crew-img" src="assets/crew/image-douglas-hurley.png" alt="">
      <img class="js-crew-img" src="assets/crew/image-mark-shuttleworth.png" alt="">
      <img class="js-crew-img" src="assets/crew/image-victor-glover.png" alt="">
      <img class="js-crew-img" src="assets/crew/image-anousheh-ansari.png" alt="">
    </div>
  </div>
</main>


<?php require('footer.php') ?>