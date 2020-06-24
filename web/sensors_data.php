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
            $query = 'SELECT sensTime AS time, 
                            (100 - LOG10(376/sensor0 - 0.367) * 100) AS sensor0, 
                            (100 - LOG10(771.5/sensor1 - 0.753) * 100) AS sensor1, 
                            (100 - LOG10(1102.9/sensor2 - 1.077) * 100) AS sensor2, 
                            (100 - LOG10(364.84/sensor3 - 0.356) * 100) AS sensor3, 
                            brightness 
                        FROM db697406.readings 
                        WHERE sensTime BETWEEN TIMESTAMP('.$_GET["dateFrom"].') AND TIMESTAMP('.$_GET["dateTo"].')';
            break;
        case 1: // temperature
            $query = 'SELECT sensTime AS time, 
                            temperature, 
                            brightness 
                        FROM db697406.readings 
                        WHERE sensTime BETWEEN TIMESTAMP('.$_GET["dateFrom"].') AND TIMESTAMP('.$_GET["dateTo"].')';
            break;
        case 2: // humidity
            $query = 'SELECT sensTime AS time, 
                            humidity, 
                            brightness 
                        FROM db697406.readings 
                        WHERE sensTime BETWEEN TIMESTAMP('.$_GET["dateFrom"].') AND TIMESTAMP('.$_GET["dateTo"].')';
            break;
        case 3: // all
            $query = 'SELECT sensTime AS time, 
                            (100 - LOG10(376/sensor0 - 0.367) * 100) AS sensor0, 
                            (100 - LOG10(771.5/sensor1 - 0.753) * 100) AS sensor1, 
                            (100 - LOG10(1102.9/sensor2 - 1.077) * 100) AS sensor2, 
                            (100 - LOG10(364.84/sensor3 - 0.356) * 100) AS sensor3, 
                            brightness, 
                            temperature, 
                            humidity 
                        FROM db697406.readings 
                        WHERE sensTime BETWEEN TIMESTAMP('.$_GET["dateFrom"].') AND TIMESTAMP('.$_GET["dateTo"].')';
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