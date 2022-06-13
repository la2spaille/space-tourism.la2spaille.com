<?php $destinations = $this->src; ?>

<div id="destination" class="page p-destination">
    <h3 class="w-page-title f-heading5 motion">
        <span number="01" class="">Pick your destination</span>
    </h3>
    <div class="l-wrapper destination">
        <div class="w-img destination m--wrapper">
            <?php foreach ($destinations as $destination) : ?>
                <img  class="m-destination-img" src="<?=$destination['images']['png']?>" srcset="<?= $destination['images']['webp'] ?>" alt="<?= $destination['name'] ?>>">
            <?php endforeach ?>
        </div>
        <div class="w-text destination ">
            <div class="w-destination-nav f-nav-text motion">
                <nav class="motion">
                    <?php foreach ($destinations as $destination) : ?>
                        <span class="m--brain destination link-hover"><?= $destination['name'] ?></span>
                    <?php endforeach ?>
                </nav>
            </div>
            <h1 class="w-h1 destination f-heading2 m--wrapper">
                <?php foreach ($destinations as $destination) : ?>
                    <span class="m-destination-name"><?= $destination['name'] ?></span>
                <?php endforeach ?>
            </h1>
            <p class="w-paragraph destination f-body-copy m--wrapper" >
                <?php foreach ($destinations as $destination) : ?>
                    <span class="m-destination-description"><?= $destination['description'] ?></span>
                <?php endforeach ?>
            </p>
            <div class="w-2-half-wrapper motion">
                <div>
                    <strong class="f-sub-heading2"><span>AVG. DISTANCE</span></strong>
                    <p class="w-destination-distance f-sub-heading1 m--wrapper">
                        <?php foreach ($destinations as $destination) : ?>
                            <span class="m-destination-distance"><?= $destination['distance'] ?></span>
                        <?php endforeach ?>
                    </p>
                </div>
                <div>
                    <strong class="f-sub-heading2"><span>Est. travel time</span></strong>
                    <p class="w-destination-travel  f-sub-heading1 m--wrapper">
                        <?php foreach ($destinations as $destination) : ?>
                            <span class="m-destination-travel "><?= $destination['travel'] ?></span>
                        <?php endforeach ?>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="w-bg">
    <div class="bg destination"></div>
</div>