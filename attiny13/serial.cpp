#include "serial.h"

void serial_init()
{
    DDRB |= 1 << SERIAL_SEND; // Set transmit as output
    PORTB |= 1 << SERIAL_SEND; // Set high (inactive)
}

void serial_print(char val)
{
    PORTB &= ~(1 << SERIAL_SEND); // Set low
    delayMicroseconds(1000000 / SERIAL_RATE); // Wait

    for (char i = 0; i < 8; ++i) { // Loop bits
        PORTB = (PORTB & ~(1 << SERIAL_SEND)) | (((val >> i) & 1) << SERIAL_SEND); // Set port for each bit
        delayMicroseconds(1000000 / SERIAL_RATE); // Wait
    }

    PORTB |= 1 << SERIAL_SEND; // Send stop bit
    delayMicroseconds(1000000 / SERIAL_RATE); // Wait
}

void serial_print(char *val)
{
    while (*val != '\0') {
        serial_print(*val++);
    }
}

void serial_print(uint16_t val)
{
    char v[5];
    itoa(val, v, 10);
    serial_print(v);
}
