<?php
$title = "Crew";
require('header.php') ?>
<div id="app" class="crew">
  <?php
  $sql = 'SELECT * FROM crew';
  $t_crew = $pdo->prepare($sql);
  $t_crew->execute();
  $crews = $t_crew->fetchAll();
  ?>
  <h3 class="w-page-title f-heading5 transformation">
    <span number="02" class="">Meet your crew</span>
  </h3>
  <div class="l-wrapper crew">
    <div class="w-navXtext crew">
      <div class="w-text crew">
        <strong class="w-strong crew f-heading4">
          <?php foreach ($crews as $crew) { ?>
            <span class="js-crew-job"><?= $crew['job'] ?></span>
          <?php } ?>
          </strong>
        <h1 class="w-h1 crew f-heading3">
          <?php foreach ($crews as $crew) { ?>
            <span class="js-crew-name"><?= $crew['name'] ?></span>
          <?php } ?>
        </h1>
        <p class="w-paragraph crew f-body-copy">
          <?php foreach ($crews as $crew) { ?>
            <span class="js-crew-description"><?= $crew['description'] ?></span>
          <?php } ?>
        </p>
      </div>
      <div class="w-crew-nav transformation">
        <?php foreach ($crews as $crew) { ?>
          <span class="js-crew-nav"></span>
        <?php } ?>
      </div>
    </div>
    <div class="w-img crew">
      <img class="js-crew-img" src="assets/crew/image-douglas-hurley.png" srcset="assets/crew/image-douglas-hurley.webp" alt="Douglas Hurley">
      <img class="js-crew-img" src="assets/crew/image-mark-shuttleworth.png" srcset="assets/crew/image-mark-shuttleworth.webp" alt="Mark Shuttleworth">
      <img class="js-crew-img" src="assets/crew/image-victor-glover.png" srcset="assets/crew/image-victor-glover.webp" alt="Victor Glover">
      <img class="js-crew-img" src="assets/crew/image-anousheh-ansari.png" srcset="assets/crew/image-anousheh-ansari.webp" alt="Anousheh Ansari">
    </div>
  </div>
</div>
<?php require('footer.php') ?>