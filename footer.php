<?php
global $title;
if ($title == 'Home') { ?>
    <?= <<<HTML
        <div class="w-bg-img">
            <div class="bg-img home"></div>
        </div>
HTML
    ?>

<?php } elseif ($title == 'Destination') { ?>
    <?= <<<HTML
        <div class="w-bg-img">
            <div class="bg-img destination"></div>
        </div>
HTML
    ?>
<?php } elseif ($title == 'Crew') { ?>
    <?= <<<HTML
        <div class="w-bg-img">
            <div class="bg-img crew"></div>
        </div>
HTML
    ?>
<?php } else { ?>
    <?= <<<HTML
        <div class="w-bg-img">
            <div class="bg-img technology"></div>
        </div>
HTML
    ?>
<?php } ?>

</div>

</main>
<div class="w-site-cursor">
    <div class="site-cursor"></div>
</div>
<noscript><div><div>Please enable JavaScript to view this website.</div></div></noscript>
<script type="module" src="js/app.js"></script>
</body>

</html>