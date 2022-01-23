<?php
$title = "Destination";
require('header.php') ?>
<?php
$sql = 'SELECT * FROM destination';
$t_destination = $pdo->prepare($sql);
$t_destination->execute();
$destinations = $t_destination->fetchAll();
?>
<main id="app">
  <h3 class="w-page-title f-heading5">
    <strong>01</strong>
    <span class="">Pick your destination</span>
  </h3>
  <div class="l-wrapper">
    <div class="w-img-wrapper destination">
      <img class="js-planet-img" src="assets/destination/image-moon.png" alt="">
      <img class="js-planet-img" src="assets/destination/image-mars.png" alt="">
      <img class="js-planet-img" src="assets/destination/image-europa.png" alt="">
      <img class="js-planet-img" src="assets/destination/image-titan.png" alt="">
    </div>
    <div class="w-text destination">
      <div class="w-planet-nav">
        <nav>
          <?php foreach ($destinations as $destination) { ?>
            <span class="f-nav-text js-planet-nav"><?= $destination['nom'] ?></span>
          <?php } ?>
        </nav>
      </div>
      <h1 class="w-planet-title f-heading2">
        <?php foreach ($destinations as $destination) { ?>
          <span class="js-planet-title"><?= $destination['nom'] ?></span>
        <?php } ?>
      </h1>
      <p class="w-planet-description body-copy f-body-copy">
        <?php foreach ($destinations as $destination) { ?>
          <span class="js-planet-description"><?= $destination['description'] ?></span>
        <?php } ?>
      </p>
      <div class="w-2-half-wrapper">
        <div>
          <strong>AVG. DISTANCE</strong>
          <p class="w-planet-distance">
            <?php foreach ($destinations as $destination) { ?>
              <span class="js-planet-distance"><?= $destination['distance'] ?></span>
            <?php } ?>
          </p>
        </div>
        <div>
          <strong>Est. travel time</strong>
          <p class="w-planet-travel">
            <?php foreach ($destinations as $destination) { ?>
              <span class="js-planet-travel"><?= $destination['travel'] ?></span>
            <?php } ?>
          </p>
        </div>
      </div>
    </div>
  </div>
</main>


<?php require('footer.php') ?>