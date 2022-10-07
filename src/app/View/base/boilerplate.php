<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

</body>
</html>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="canonical" href="<?= $this->head['url']; ?>">
    <!-- Robots -->
    <meta name="robots" content="<?= $this->head['robots']; ?>">
    <!-- Device -->
    <?php include ROOT . 'app/View/head/device.php'; ?>
    <!-- SEO -->
    <title><?= $this->head['title']; ?></title>
    <meta name="description" content="<?= $this->head['description']; ?>">
    <!-- Social -->
    <?php include ROOT . 'app/View/head/social.php'; ?>
    <!-- Preload -->
    <?php include ROOT . 'app/View/head/preload.php'; ?>
    <!-- Favicon -->
    <?php include ROOT . 'app/View/head/favicon.php'; ?>
    <!-- Static -->
    <?php include ROOT . 'app/View/head/static.php'; ?>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed&family=Barlow:wght@400;700&family=Bellefair&display=swap');
    </style>
</head>
<body>
<div id="app">
    <?php include ROOT . 'app/View/common/header.php'; ?>
    <main id="main">
        <?= $this->content; ?>
    </main>
    <?php include ROOT . 'app/View/gl/gl.php'; ?>
    <div id="progress">
        <div class="progress"></div>
    </div>
    <?php include ROOT . 'app/View/common/cursor.php'; ?>
    <?php include ROOT . 'app/View/common/background.php'; ?>
</div>
<?php include ROOT . 'app/View/script/script.php'; ?>
</body>
</html>
