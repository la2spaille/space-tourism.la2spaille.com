<?php
$title = "Destination";
require('header.php') ;
$destinations = $data['destinations'];
?>

<div id="app" class="destination">
  <h3 class="w-page-title f-heading5 transformation">
    <span number="01" class="">Pick your destination</span>
  </h3>
  <div class="l-wrapper destination">
    <div class="w-img destination">
        <span class="w-magnet"></span>
        <?php foreach ($destinations as $destination) : ?>
            <img data-parallax="0.1" class="js-destination-img" src="<?=$destination['images']['png']?>" srcset="<?= $destination['images']['webp'] ?>" alt="<?= $destination['name'] ?>>">
        <?php endforeach ?>
    </div>
    <div class="w-text destination ">
      <div class="w-destination-nav f-nav-text transformation">
        <nav class="transformation">
          <?php foreach ($destinations as $destination) : ?>
            <span class="js-destination-nav link-hover"><?= $destination['name'] ?></span>
          <?php endforeach ?>
        </nav>
      </div>
      <h1 class="w-h1 destination f-heading2">
        <?php foreach ($destinations as $destination) : ?>
          <span class="js-destination-name"><?= $destination['name'] ?></span>
        <?php endforeach ?>
      </h1>
      <p class="w-paragraph destination f-body-copy">
        <?php foreach ($destinations as $destination) : ?>
          <span class="js-destination-description"><?= $destination['description'] ?></span>
        <?php endforeach ?>
      </p>
      <div class="w-2-half-wrapper transformation">
        <div>
          <strong class="f-sub-heading2"><span>AVG. DISTANCE</span></strong>
          <p class="w-destination-distance f-sub-heading1">
            <?php foreach ($destinations as $destination) : ?>
              <span class="js-destination-distance"><?= $destination['distance'] ?></span>
            <?php endforeach ?>
          </p>
        </div>
        <div>
          <strong class="f-sub-heading2"><span>Est. travel time</span></strong>
          <p class="w-destination-travel  f-sub-heading1">
            <?php foreach ($destinations as $destination) : ?>
              <span class="js-destination-travel "><?= $destination['travel'] ?></span>
            <?php endforeach ?>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require('footer.php') ?>