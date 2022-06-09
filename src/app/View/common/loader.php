<div id="load" style="display: none">
    <div class="w-load">
        <?php for ($i = 0; $i < 24; $i++): ?>
            <div class="to"></div>
        <?php endfor; ?>
    </div>
    <h1 class="load-text">
        <?php $T = explode(" ", 'L a 2 s p a i l l e');?>
        <?php for ($i = 0; $i < count($T); $i++):?>
            <span><span class="to"><?= $T[$i] ?></span></span>
        <?php endfor; ?>
        <span class="load-line to"></span>
    </h1>
</div>