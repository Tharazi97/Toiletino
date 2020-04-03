<?php

    // Prepare variables for database connection  
    $dbUsername = "DATABASE_USERNAME";
    $dbPassword = "DATABASE_PASSWORD";
    $dbServer = "DATABASE_SERVER";
    $dbName = "DATABASE_NAME";

    // Connect to your database
    $dbConnect = mysql_pconnect($dbServer, $dbUsername, $dbPassword);
    $dbSelect = mysql_select_db($dbName, $dbConnect);
    //$mysqli = new mysqli($dbServer, $dbUsername, $dbPassword, $dbName);

    // Prepare the SQL statement

    $sql = "INSERT INTO '. $dbName.'.readings (sensor0, sensor1, sensor2, sensor3, brightness, temperature, humidity) VALUES ('".$_GET["sensor0"]."', '".$_GET["sensor1"]."', '".$_GET["sensor2"]."', '".$_GET["sensor3"]."', '".$_GET["brightness"]."', '".$_GET["temperature"]."', '".$_GET["humidity"]."')";    

    // Execute SQL statement

    mysql_query($sql);
    //$mysqli->query($sql);
    //$mysqli->close();

?>