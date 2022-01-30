<?php
$title = "Destination";
require('header.php') ?>

<div id="app" class="destination">
  <?php
  $sql = 'SELECT * FROM destination';
  $t_destination = $pdo->prepare($sql);
  $t_destination->execute();
  $destinations = $t_destination->fetchAll();
  ?>
  <h3 class="w-page-title f-heading5 transformation">
    <span number="01" class="">Pick your destination</span>
  </h3>
  <div class="l-wrapper destination">
    <div class="w-img destination">
      <img data-parallax="0.2" class="js-destination-img" src="assets/destination/image-moon.png" srcset="assets/destination/image-moon.webp "  alt="Moon">
      <img data-parallax="0.2" class="js-destination-img" src="assets/destination/image-mars.png" srcset="assets/destination/image-mars.webp" alt="Mars">
      <img data-parallax="0.2" class="js-destination-img" src="assets/destination/image-europa.png" srcset="assets/destination/image-europa.webp" alt="Europa">
      <img data-parallax="0.2" class="js-destination-img" src="assets/destination/image-titan.png" srcset="assets/destination/image-titan.webp" alt="Titan">
    </div>
    <div class="w-text destination ">
      <div class="w-destination-nav f-nav-text transformation">
        <nav class="transformation">
          <?php foreach ($destinations as $destination) { ?>
            <span class="js-destination-nav link-hover"><?= $destination['nom'] ?></span>
          <?php } ?>
        </nav>
      </div>
      <h1 class="w-h1 destination f-heading2">
        <?php foreach ($destinations as $destination) { ?>
          <span class="js-destination-name"><?= $destination['nom'] ?></span>
        <?php } ?>
      </h1>
      <p class="w-paragraph destination f-body-copy">
        <?php foreach ($destinations as $destination) { ?>
          <span class="js-destination-description"><?= $destination['description'] ?></span>
        <?php } ?>
      </p>
      <div class="w-2-half-wrapper transformation">
        <div>
          <strong class="f-sub-heading2"><span>AVG. DISTANCE</span></strong>
          <p class="w-destination-distance f-sub-heading1">
            <?php foreach ($destinations as $destination) { ?>
              <span class="js-destination-distance"><?= $destination['distance'] ?></span>
            <?php } ?>
          </p>
        </div>
        <div>
          <strong class="f-sub-heading2"><span>Est. travel time</span></strong>
          <p class="w-destination-travel  f-sub-heading1">
            <?php foreach ($destinations as $destination) { ?>
              <span class="js-destination-travel "><?= $destination['travel'] ?></span>
            <?php } ?>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require('footer.php') ?>