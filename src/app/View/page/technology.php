<?php $technologies = $this->data; ?>

<div id="technology" class="page p-technology">
    <h3 class="w-page-title f-heading5">
        <span data-number="03" class="technology_title">SPACE LAUNCH 101</span>
    </h3>
    <div class="l-wrapper technology l-technology">
        <div class="w-navXtext technology">
            <div class="w-technology-nav">
                <?php foreach ($technologies as $i => $technology) { ?>
                    <span class="m--brain technology">
                        <?= $i + 1 ?>
                     </span>
                <?php } ?>
            </div>
            <div class="w-text technology">
                <strong class="w-strong technology f-nav-text"><span>THE TERMINOLOGY…</span></strong>
                <h1 class="w-h1 technology f-heading3 m--wrapper">
                    <?php foreach ($technologies as $technology) { ?>
                        <span class="m-technology-name"><?= $technology['name'] ?></span>
                    <?php } ?>
                </h1>
                <div class="w-paragraph technology f-body-copy m--wrapper">
                    <?php foreach ($technologies as $technology) { ?>
                        <p class="m-technology-description"><?= $technology['description'] ?></span>
                    <?php } ?>
                    </div>
            </div>
        </div>
        <div class="w-img technology m--wrapper">
            <?php foreach ($technologies as $technology) { ?>
                <div class="m-technology-img"></div>
            <?php } ?>
        </div>
    </div>
</div>