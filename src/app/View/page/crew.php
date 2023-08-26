<?php $crews = $this->data; ?>
<div id="crew" class="page p-crew">
    <h3 class="w-page-title f-heading5">
        <span data-number="02" class="crew_title">Meet your crew</span>
    </h3>
    <div class="l-wrapper crew l-crew">
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
                <div class="w-paragraph crew f-body-copy m--wrapper">
                    <?php foreach($crews as $crew) : ?>
                        <p class="m-crew-description"><?= $crew['bio'] ?></p>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="w-crew-nav">
                <?php foreach($crews as $crew) : ?>
                    <span class="m--brain crew"></span>
                <?php endforeach; ?>
            </div>
        </div>
        <div class="w-img crew m--wrapper">
            <?php foreach($crews as $crew) : ?>
                <img class="m-crew-img"
                     src="<?= $crew['images']['png'] ?>"
                     srcset="<?= $crew['images']['webp'] ?>"
                     alt="<?= $crew['name'] . ' picture'  ?>">
            <?php endforeach; ?>
        </div>
    </div>
</div>
