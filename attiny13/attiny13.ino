#include "serial.h"
volatile bool flag = false;

void int1()
{
    flag = true;
}

void setup()
{
    analogReference(0);
    serial_init();
    attachInterrupt(0, int1, RISING);
}
void loop()
{
    if (flag == true) {
        flag = false;
        serial_print("sen0: ");
        serial_println(analogRead(A0));
        serial_print("sen1: ");
        serial_println(analogRead(A1));
        serial_print("sen2: ");
        serial_println(analogRead(A2));
        serial_print("sen3: ");
        serial_println(analogRead(A3));
        delay(1000);
    }
    delay(100);
}
