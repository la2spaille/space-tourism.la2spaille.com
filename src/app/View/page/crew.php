<?php $crews = $this->src; ?>
<div id="crew" class="page p-crew">
    <h3 class="w-page-title f-heading5 motion">
        <span number="02" class="">Meet your crew</span>
    </h3>
    <div class="l-wrapper crew">
        <div class="w-navXtext crew">
            <div class="w-text crew">
                <strong class="w-strong crew f-heading4">
                    <?php foreach($crews as $crew) { ?>
                        <span class="js-crew-job"><?= $crew['role'] ?></span>
                    <?php } ?>
                </strong>
                <h1 class="w-h1 crew f-heading3">
                    <?php foreach($crews as $crew) { ?>
                        <span class="js-crew-name"><?= $crew['name'] ?></span>
                    <?php } ?>
                </h1>
                <p class="w-paragraph crew f-body-copy">
                    <?php foreach($crews as $crew) { ?>
                        <span class="js-crew-description"><?= $crew['bio'] ?></span>
                    <?php } ?>
                </p>
            </div>
            <div class="w-crew-nav motion">
                <?php foreach($crews as $crew) { ?>
                    <span class="js-crew-nav"></span>
                <?php } ?>
            </div>
        </div>
        <div class="w-img crew">
            <?php foreach($crews as $crew) { ?>
                <img class="js-crew-img" src="<?= $crew['images']['png'] ?>" srcset="<?= $crew['images']['webp'] ?>" alt="<?= $crew['name'] ?>">
            <?php } ?>
        </div>
    </div>
</div>
<div class="w-bg">
    <div class="bg crew"></div>
</div>