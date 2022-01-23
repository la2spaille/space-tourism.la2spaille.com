<?php 
global $title;
if($title == 'Home') {
    echo '<img src="assets/home/background-home-desktop.jpg" alt="">';

} elseif ($title == 'Destination') {
    echo '<img src="assets/destination/background-destination-desktop.jpg" alt="">' ;
} elseif ($title == 'Crew') {
    echo '<img src="assets/crew/background-crew-desktop.jpg" alt="">' ;
} else {
    echo '<img src="assets/technology/background-technology-desktop.jpg" alt="">' ;
}
?>



<script src="js/app.js"></script>
<script src="js/crew.js"></script>
<!-- <script src="js/app.js"></script> -->
</body>
</html>