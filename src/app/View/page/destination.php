<?php $destinations = $this->data; ?>
<div id="destination" class="page p-destination">
    <h3 class="w-page-title f-heading5">
        <span data-number="01" class="m-line__title destination_title">Pick your destination</span>
    </h3>
    <div class="l-wrapper destination l-destination">
        <div class="w-img destination m--wrapper">
            <?php foreach ($destinations as $destination) : ?>
                <img  class="m-destination-img" src="<?=$destination['images']['png']?>" srcset="<?= $destination['images']['webp'] ?>" alt="<?= $destination['name'] ?>>">
            <?php endforeach ?>
        </div>
        <div class="w-text destination ">
            <div class="w-destination-nav f-nav-text">
                <nav>
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
            <div class="w-paragraph destination f-body-copy m--wrapper" >
                <?php foreach ($destinations as $destination) : ?>
                    <p class="m-destination-description"><?= $destination['description'] ?></p>
                <?php endforeach ?>
            </div>
            <div class="w-2-half-wrapper">
                <div>
                    <strong class="f-sub-heading2"><span>AVG. DISTANCE</span></strong>
                    <div class="w-destination-distance f-sub-heading1 m--wrapper f-hidden">
                        <?php foreach ($destinations as $destination) : ?>
                            <span class="m-destination-distance"><?= $destination['distance'] ?></span>
                        <?php endforeach ?>
                    </div>
                </div>
                <div>
                    <strong class="f-sub-heading2"><span>Est. travel time</span></strong>
                    <div class="w-destination-travel  f-sub-heading1 m--wrapper f-hidden">
                        <?php foreach ($destinations as $destination) : ?>
                            <span class="m-destination-travel "><?= $destination['travel'] ?></span>
                        <?php endforeach ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>