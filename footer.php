<?php
global $title;
if ($title == 'Home') { ?>
    <?= <<<HTML
        
HTML
    ?>

<?php } elseif ($title == 'Destination') { ?>
    <?= <<<HTML
        
HTML
    ?>
<?php } elseif ($title == 'Crew') { ?>
    <?= <<<HTML
       
HTML
    ?>
<?php } else { ?>
    <?= <<<HTML
       
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