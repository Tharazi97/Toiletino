#include <ESP8266WiFi.h>
#include "DHT.h"

#define defaultDelayMin 10
#define occupatedDelayMin 1
#define occupatedBrightness 0

const char *ssid     = "NETWORK_SSID";
const char *password = "NETWORK_PASSWORD";

const char *host = "HOSTING__PAGE";
const uint16_t port = 80;

char counter = defaultDelayMin;

String textATTINY;
int valSens0, valSens1, valSens2, valSens3;
int valHumidity = 0;
float valTemperature = 0;
bool sendWIFI = false;

DHT dht;

void setup()
{
    pinMode(12, OUTPUT);
    dht.setup(4);
    Serial.begin(9600);

    // Connect to wifi
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop()
{

    delay(occupatedDelayMin * 60000);
    counter++;

    // Check if there should be reading now
    if ((counter * occupatedDelayMin >= defaultDelayMin) || (analogRead(A0) >= occupatedBrightness)) {
        counter = 0;

        // Interrupt ATtiny and read a message from it
        while (1) {
            Serial.flush();

            do { // while (textATTINY.length() < 5)
                digitalWrite(12, HIGH);
                delay(1);
                digitalWrite(12, LOW);
                textATTINY = Serial.readString();
            } while (textATTINY.length() < 5);
            Serial.println(textATTINY);

            // Chunk the text and check for errors
            if ((textATTINY.indexOf("sen0: ") == 0) && (textATTINY.indexOf("\n\r") < 12)) {
                valSens0 = (textATTINY.substring(6, textATTINY.indexOf("\n\r"))).toInt();
                textATTINY.remove(0, textATTINY.indexOf("\n\r") + 2);
            } else {
                textATTINY = "";
                continue; // There was some error in communication. Start process from the beggining.
            }

            if ((textATTINY.indexOf("sen1: ") == 0) && (textATTINY.indexOf("\n\r") < 12)) {
                valSens1 = (textATTINY.substring(6, textATTINY.indexOf("\n\r"))).toInt();
                textATTINY.remove(0, textATTINY.indexOf("\n\r") + 2);
            } else {
                textATTINY = "";
                continue; // There was some error in communication. Start process from the beggining.
            }

            if ((textATTINY.indexOf("sen2: ") == 0) && (textATTINY.indexOf("\n\r") < 12)) {
                valSens2 = (textATTINY.substring(6, textATTINY.indexOf("\n\r"))).toInt();
                textATTINY.remove(0, textATTINY.indexOf("\n\r") + 2);
            } else {
                textATTINY = "";
                continue; // There was some error in communication. Start process from the beggining.
            }

            if ((textATTINY.indexOf("sen3: ") == 0) && (textATTINY.indexOf("\n\r") < 12)) {
                valSens3 = (textATTINY.substring(6, textATTINY.indexOf("\n\r"))).toInt();
                textATTINY.remove(0, textATTINY.indexOf("\n\r") + 2);
            } else {
                textATTINY = "";
                continue; // There was some error in communication. Start process from the beggining.
            }

            textATTINY = "";

            // Get temperature and humidity
            do { // while ((valHumidity == 0)||(valTemperature == 0))
                valHumidity = dht.getHumidity();
                valTemperature = dht.getTemperature();
            } while ((valHumidity == 0) || (valTemperature == 0));

            sendWIFI = true; //Send received values to database
            break;
        }
    }

    if (sendWIFI) {
        sendWIFI = false;

        // Send collected readings to database
        Serial.print("connecting to ");
        Serial.print(host);
        Serial.print(':');
        Serial.println(port);

        // Use WiFiClient class to create TCP connections
        WiFiClient client;
        if (!client.connect(host, port)) {
            Serial.println("connection failed");
            delay(5000);
            return;
        }

        Serial.println("sending data to server");
        if (client.connected()) {

            // GET request
            client.print("GET /write_data.php?");
            client.print("sensor0=");
            client.print(valSens0);
            client.print("&sensor1=");
            client.print(valSens1);
            client.print("&sensor2=");
            client.print(valSens2);
            client.print("&sensor3=");
            client.print(valSens3);
            client.print("&brightness=");
            client.print(analogRead(A0));
            client.print("&temperature=");
            client.print(valTemperature);
            client.print("&humidity=");
            client.print(valHumidity);
            client.println(" HTTP/1.1");

            // Close connection
            client.print("Host: ");
            client.println(host);
            client.println("Connection: close");
            client.println();
            client.println();
            client.stop();
        }
    }

}
