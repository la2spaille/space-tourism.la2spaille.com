<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title><?= $this->head['title']; ?></title>
    <?php include ROOT . 'app/View/head/favicon.php'; ?>
    <?php include ROOT . 'app/View/head/static.php'; ?>
</head>
<body>
<div id="app">
    <main id="main">
        <div class="l-wrapper 404"
             style="position: absolute; top:55%; left: 50%; transform: translate(-50%, 50%); width: 100vw;text-align: center; justify-content: center">
            <div class="w-text 404 transformation">
                <h1 class="w-h1 home f-heading1" style=" font-size: 30vw; line-height: 1">
                    <span>404</span>
                </h1>
                <strong style="font-family: 'Barlow', sans-serif;">The page you are looking for can't be found
                    🥲 </strong>
            </div>
        </div>
    </main>
    <?php include ROOT . 'app/View/common/header.php'; ?>
</div>
</body>
</html>
