#include <Arduino.h>
#include <stdlib.h>
#include <WiFi.h>
#include <ESPping.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <PubSubClient.h>

#include "ReferenceCaller.h"
#include "globals.h"
#include "Connection_lib.h"
#include "utils.h"
#include "fsmLib.h"
#include "EEPROM_Lib.h"
#include "mqtt_Lib.h"


//------------------------- DEFINE --------------------//
#define PRINT_LOG     false
#define BAUDRATE      115200
// #define EEPROM_RESTORE_DEFAULT
#define MQTT_ENABLE

//------------------------- GLOBAL VARABLE ------------//
char fw_ver[8]                          = "0.0.1";
unsigned long currentTime, previousTime; // used for millis() timing

//------------------------- FUNCTIONS -----------------//

void setup()
{
  if (setup_enable == true)
  {
  DEBUG_BEGIN(BAUDRATE);
  Serial.begin(BAUDRATE );

  DEBUG_PRINT_F("\n");
  DEBUG_PRINTLN_F("*****************************************************************");
  DEBUG_PRINTLN_F("*                   Espressif-32 firmware                       *");
  DEBUG_PRINT_F(  "*                   Fw. ver.: ");
  DEBUG_PRINT(fw_ver);
  DEBUG_PRINTLN_F("                             *");
  DEBUG_PRINTLN_F("*****************************************************************");
  DEBUG_PRINT_F("\n");

  DEBUG_PRINTLN_F("Main.cpp: setup(): Start setup()...");
  /* Set for debug purposes */
  DEBUG_PRINT_F("Main.cpp: setup(): Initializing serial0 communication... baudrate: ");
  DEBUG_PRINTLN(Serial.baudRate());
  DEBUG_PRINT_F("\n");
  
  /* EEPROM initialization */
  eeprom_init(EEPROM_SIZE);

#ifdef EEPROM_RESTORE_DEFAULT
  eeprom_clear();
#endif

  /* Load wifi config from eeprom */
  data first_load;
  for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
  {
    eeprom_loadStruct(&first_load, sizeof(first_load), ii * sizeof(first_load) + 1);
    memcpy(&d_eeprom[ii], &first_load, sizeof(first_load));
    DEBUG_PRINT(first_load.index_addr);
    DEBUG_PRINT_F(", ");
    DEBUG_PRINT(first_load.data_string);
    DEBUG_PRINT_F(", ");
    DEBUG_PRINT(first_load.data_name);
    DEBUG_PRINT_F(", ");
    DEBUG_PRINTLN(first_load.data_value);
  }

  if (first_load.index_addr == 0xFFFF || first_load.index_addr == 0)
  {
    DEBUG_PRINTLN_F("Main.cpp: setup(): Nothing in memory: Writing default configuration in resident memory...");
    for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
    {
      memcpy(&first_load, &data_eeprom[ii], sizeof(first_load));
      eeprom_storeStruct(&first_load, sizeof(first_load), ii * sizeof(first_load) + 1);
    }
    DEBUG_PRINTLN_F("Main.cpp: setup(): Writing done ");
    ESP.restart();
  }
  else
  {
    DEBUG_PRINTLN_F("Main.cpp: setup(): Configuration loaded from resident memory");
    for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
    {
      DEBUG_PRINT(d_eeprom[ii].index_addr);
      DEBUG_PRINT_F(", ");
      DEBUG_PRINT(d_eeprom[ii].data_name);
      DEBUG_PRINT_F(", ");
      DEBUG_PRINT(d_eeprom[ii].data_value);
      DEBUG_PRINT_F(", ");
      DEBUG_PRINTLN(d_eeprom[ii].data_string);
    }
  }

  DEBUG_PRINTLN_F("Main.cpp: setup(): Start Wi-Fi initializing");
  init_wifi((WiFiMode_t) d_eeprom[6].data_value, d_eeprom[1].data_string, d_eeprom[2].data_string, (float) d_eeprom[8].data_value);

  /* Start local server listening */
  start_server();
  DEBUG_PRINTLN_F("Main.cpp: setup(): server.begin() launched ");

  DEBUG_PRINTLN_F("Main.cpp: setup(): End setup");

  }
}

void loop()
{
  currentTime = millis();
  FSM_loop(fsm_main_state);

  delay(1);
  previousTime = currentTime;
}


