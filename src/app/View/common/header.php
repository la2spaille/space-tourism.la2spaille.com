<?php
function set_nav($id, $link, $url): string
{
    $R_url = $_SERVER['REQUEST_URI'];
    $class = ($R_url === $url ? "active" : " ");
    return <<<HTML
    <span class='link-hover $class'>
      <a data-id="$id" href='$url' class="link header close_btn"> $link</a>
    </span>
HTML;

}

?>

<header>
    <div class="w-logo">
            <span><a class="link-hover" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><g
                                fill="none" fill-rule="evenodd"><circle cx="24" cy="24" r="24" fill="#FFF"/><path
                                    fill="#0B0D17"
                                    d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"/></g></svg></a></span>
    </div>
    <div class="w-nav">
        <div class="w-close-btn close_btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21">
                <g fill="#D0D6F9" fill-rule="evenodd">
                    <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z"/>
                    <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z"/>
                </g>
            </svg>
        </div>
        <nav class="f-nav-text">
            <?= set_nav('00', 'Home', '/') ?>
            <?= set_nav('01', 'Destination', '/destination') ?>
            <?= set_nav('02', 'Crew', '/crew') ?>
            <?= set_nav('03', 'Technology', '/technology') ?>
        </nav>
    </div>
    <div class="w-menu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
            <g fill="#D0D6F9" fill-rule="evenodd">
                <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z"/>
            </g>
        </svg>
    </div>
</header>