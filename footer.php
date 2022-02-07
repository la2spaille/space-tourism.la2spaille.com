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


</main>
<div class="loader">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <g fill="none" fill-rule="evenodd">
            <circle cx="24" cy="24" r="24" fill="#FFF" />
            <path fill="#0B0D17" d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z" />
        </g>
    </svg>
    <strong>
        <span>Space Tourism</span>
    </strong>
</div>
<div class="w-site-cursor">
    <div class="site-cursor"></div>
</div>
<script type="module" src="js/app.js"></script>
</body>

</html>