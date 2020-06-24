#include <avr/io.h>
#include <Arduino.h>
#define SERIAL_SEND 0
#define SERIAL_RATE 2400

#define SERIAL_BIT_TIME (1000000.0 / SERIAL_RATE) / (1.0 / 9.6 * 64)


void serial_init();

void serial_print(char val);

void serial_print(char *val);

void serial_print(uint16_t val);

inline void serial_println(char val)
{
    serial_print(val);
    serial_print('\n');
    serial_print('\r');
};

inline void serial_println(char *val)
{
    serial_print(val);
    serial_print('\n');
    serial_print('\r');
};

inline void serial_println(uint16_t val)
{
    serial_print(val);
    serial_print('\n');
    serial_print('\r');
};
