/**
 * 
 * @file EEPROM_Lib.h
 * @author Alessandro Alinovi
 * @date 2024-06-26
 * @version 0.0.1
 * @copyright Copyright (c) 2023
 * @brief EEPROM method to approach to residetn memory 
 * 
*/

#include <stdlib.h>
#include <string.h>
#include <EEPROM.h>

/* commit eeprom_size bytes of ESP8266 flash (for "EEPROM" emulation) */
void eeprom_init(uint16_t eeprom_size = 0)
{
  uint16_t size = 0;
  if (eeprom_size == 0)
    size = EEPROM.length();
  else
    size = eeprom_size;
  
  DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_init(): size to allocate: ");
  DEBUG_PRINTLN(size);
  EEPROM.begin(size);
}

uint8_t eeprom_read(int eepromAddr)
{
  uint8_t value = 0xFF;
  value = EEPROM.read(eepromAddr);
  // DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_read(): Read Address: ");
  // DEBUG_PRINTLN(eepromAddr);
  // DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_read(): Read value: ");
  // DEBUG_PRINTLN(value);

  return value;
}

void eeprom_write(int eepromAddr, uint8_t value)
{
  DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_write(): Write Address: ");
  DEBUG_PRINTLN(eepromAddr);
  DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_write(): Write value: ");
  DEBUG_PRINTLN(value);

  EEPROM.write(eepromAddr, value);
  eeprom_commit();
}

void eeprom_write_string(uint16_t eepromAddr, String stringData)
{
  DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_write_string(): Write Address: ");
  DEBUG_PRINTLN(eepromAddr);
  DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_write_string(): Write String: ");
  DEBUG_PRINTLN(stringData);

  EEPROM.put(eepromAddr, stringData);
  eeprom_commit();
}

/* Create a type String function that reads from EEPROM byte by byte, stores it in a char array, converts it to a string, and returns a String */
String eeprom_read_string(int address) 
{
  char x[255], c=0;
  int i = 0;

  DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_read_string(): Read Address: ");
  DEBUG_PRINTLN(address);
  
  while (c != NULL) 
  {
    x[i] = EEPROM.read(address);
    c = x[i];
    address++;
    i++;
  }
  DEBUG_PRINT_F("EEPROM_Lib.h: eeprom_read_string(): String recovered: ");
  DEBUG_PRINTLN(x);

  return String(x);
}

/* Check whether write to EEPROM was successful or not with the EEPROM.commit() function. */
void eeprom_commit() 
{
  if (EEPROM.commit()) 
  {
    DEBUG_PRINTLN_F("EEPROM_Lib.h: eeprom_commit(): EEPROM successfully committed!");
  } 
  else 
  {
    DEBUG_PRINTLN_F("EEPROM_Lib.h: eeprom_commit(): ERROR! EEPROM commit failed!");
  }
}

void eeprom_clear()
{
  for (uint16_t ii = 0 ; ii < EEPROM.length(); ii++) 
  {
    EEPROM.write(ii, 0);
  }

  EEPROM.end();
  DEBUG_PRINTLN_F("EEPROM_Lib.h: eeprom_clear(): EEPROM Clear Done!");
}

/* storeStruct(&settings, sizeof(settings)); */
void eeprom_storeStruct(void *data_source, size_t size, int address)
{
  for(size_t i = 0; i < size; i++)
  {
    char data = ((char *) data_source) [i];
    EEPROM.write(address + i, data);
  }
  EEPROM.commit();
}

/* loadStruct(&settings, sizeof(settings)); */
void eeprom_loadStruct(void *data_dest, size_t size, int address)
{
  for(size_t i = 0; i < size; i++)
  {
    char data = EEPROM.read(address + i);
    ((char *) data_dest) [i] = data;
  }

}
