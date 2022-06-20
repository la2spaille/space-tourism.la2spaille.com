<?php $crews = $this->src; ?>
<div id="crew" class="page p-crew">
    <h3 class="w-page-title f-heading5 motion">
        <span data-number="02" class="">Meet your crew</span>
    </h3>
    <div class="l-wrapper crew">
        <div class="w-navXtext crew">
            <div class="w-text crew">
                <strong class="w-strong crew f-heading4 m--wrapper">
                    <?php foreach($crews as $crew): ?>
                        <span class="m-crew-job"><?= $crew['role'] ?></span>
                    <?php endforeach; ?>
                </strong>
                <h1 class="w-h1 crew f-heading3 m--wrapper">
                    <?php foreach($crews as $crew): ?>
                        <span class="m-crew-name"><?= $crew['name'] ?></span>
                    <?php endforeach; ?>
                </h1>
                <p class="w-paragraph crew f-body-copy m--wrapper">
                    <?php foreach($crews as $crew) : ?>
                        <span class="m-crew-description"><?= $crew['bio'] ?></span>
                    <?php endforeach; ?>
                </p>
            </div>
            <div class="w-crew-nav motion">
                <?php foreach($crews as $crew) : ?>
                    <span class="m--brain crew"></span>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="w-img crew ">
            <?php foreach($crews as $crew) : ?>
                <img class="m-crew-img" src="<?= $crew['images']['png'] ?>" srcset="<?= $crew['images']['webp'] ?>" alt="<?= $crew['name'] ?>">
            <?php endforeach; ?>
        </div>
    </div>
</div>
