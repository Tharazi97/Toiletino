<?php
    //setting header to json
    header('Content-Type: application/json');

    //database
    $dbUsername = "DATABASE_USERNAME";
    $dbPassword = "DATABASE_PASSWORD";
    $dbServer = "DATABASE_SERVER";
    $dbName = "DATABASE_NAME";

    $graphType = $_GET["type"];

    //get connection
    $mysqli = new mysqli($dbServer, $dbUsername, $dbPassword, $dbName);

    if(!$mysqli){
        die("Connection failed: " . $mysqli->error);
    }

    $query = '';

    switch ($graphType) {
        case 0: // pollution
            $query = 'SELECT sensTime AS time, sensor0, sensor1, sensor2, sensor3, brightness FROM'. $dbName.'.readings WHERE sensTime BETWEEN TIMESTAMP('.$_GET["dateFrom"].') AND TIMESTAMP('.$_GET["dateTo"].')';
            break;
        case 1: // temperature
            $query = 'SELECT sensTime AS time, temperature FROM '. $dbName.'.readings WHERE sensTime BETWEEN TIMESTAMP('.$_GET["dateFrom"].') AND TIMESTAMP('.$_GET["dateTo"].')';
            break;
        case 2: // humidity
            $query = 'SELECT sensTime AS time, humidity FROM '. $dbName.'.readings WHERE sensTime BETWEEN TIMESTAMP('.$_GET["dateFrom"].') AND TIMESTAMP('.$_GET["dateTo"].')';
            break;
        default:
            die("Wrong graphType");
    }
    //execute query
    $result = $mysqli->query($query);

    //loop through the returned data
    $data = array();

    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;
    }

    //free memory associated with result
    $result->close();

    //close connection
    $mysqli->close();

    //now print the data
    print json_encode($data);
?>