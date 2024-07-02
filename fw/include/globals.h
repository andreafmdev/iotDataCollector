/**
 * 
 * @file globals.h
 * @author Alessandro Alinovi
 * @date 2024-06-26
 * @version 0.0.1
 * @copyright Copyright (c) 2023
 * @brief Globals data container
 * 
*/

//------------------------- DEFINE --------------------//
#define DELAY_REBOOT                    3000
#define DATA_STRUCT_TO_STORE            16

/* COMMAND RESPONSE CODE */
#define COK                           200     /* COK 200 command executed succesfully */
#define CNE                           401     /* Command Not Exist */

#define DEBUG_BEGIN(x)                Serial.begin(x)
#define DEBUG_PRINT(x)                Serial.print(x)
#define DEBUG_PRINT_F(x)              Serial.print(F(x))
#define DEBUG_PRINTLN(x)              Serial.println(x)
#define DEBUG_PRINTLN_F(x)            Serial.println(F(x))

#define VERBOSE_PRINT(x)                Serial.print(x)
#define VERBOSE_PRINT_F(x)              Serial.print(F(x))
#define VERBOSE_PRINTLN(x)              Serial.println(x)
#define VERBOSE_PRINTLN_F(x)            Serial.println(F(x))

#define ERROR_PRINT(x)                Serial.print(x)
#define ERROR_PRINT_F(x)              Serial.print(F(x))
#define ERROR_PRINTLN(x)              Serial.println(x)
#define ERROR_PRINTLN_F(x)            Serial.println(F(x))

/* Remote server Port */
#define REMOTE_PORT 3000

/* Errors List */
#define SERVER_REGISTER_CONFIRM_ERR     -5

IPAddress remoteIp(13, 40, 6, 244);
String serverName = "http://" + remoteIp.toString() + ":" + REMOTE_PORT;

#ifdef MQTT_ENABLE
  /* Add your MQTT Broker IP address, example: */
  const char* mqtt_server = "192.168.1.144";
  /* MQTT Broker */
  const char *mqtt_broker = "broker.emqx.io";
  const char *topic = "emqx/esp32";
  const char *mqtt_username = "emqx";
  const char *mqtt_password = "public";
  const int mqtt_port = 1883;
#endif


struct data
{
  uint8_t index_addr;
  char data_name[16];
  int16_t data_value;
  char data_string[32];
};

data d_eeprom[DATA_STRUCT_TO_STORE];
data data_eeprom[DATA_STRUCT_TO_STORE] = 
{
  /* 
  index_addr,     data_name,      data_value,     data_string 
  */
  {0,              "1ST_LOAD",      0,                "(VOID)"},
  {1,              "SSID",          0,                "Ali'"},
  {2,              "WIFI_PWD",      0,                "xico5304"},
  {3,              "REMOTE_SRV_IP", 0,                "192.168.127.2"},
  {4,              "INT_SRV_PORT",  9060,             "(VOID)"},                     /* Port which ESP will be listen */
  {5,              "OUT_SRV_PORT",  9061,             "(VOID)"},                     /* Server TCP port where ESP will be send requests*/
  {6,              "ESP_MODE",      WIFI_AP_STA,      "(VOID)"},                     /* WIFI_OFF = 0, WIFI_STA = 1, WIFI_AP = 2, WIFI_AP_STA = 3*/
  {7,              "LAST_SYNCH",    0,                "(VOID)"},
  {8,              "TX_POWER",      0,                "(VOID)"},
  {9,              "(VOID)",        0,                "(VOID)"},
  {10,              "(VOID)",       0,                "(VOID)"},
  {11,              "(VOID)",       0,                "(VOID)"},
  {12,              "(VOID)",       0,                "(VOID)"},
  {13,              "(VOID)",       0,                "(VOID)"},
  {14,              "(VOID)",       0,                "(VOID)"},
  {15,              "(VOID)",       0,                "(VOID)"},
};

const uint16_t EEPROM_SIZE =            sizeof(data_eeprom);

void MSG_PARSE(String cmd, String words[], uint8_t &len) 
{

  //Prelevo parametri dal messaggio  
  byte qnt_sep = 0;
  for (byte i = 0; i < cmd.length(); i++) {
    if (cmd.charAt(i) == '|') {
      qnt_sep++;
    }
  }

  uint8_t array_len = qnt_sep + 1;
  memcpy(&len, &array_len, sizeof(len));

  String MsgArray[array_len];
  for (byte j = 0; j < array_len; j++) {
    MsgArray[j] = "";
  }

  byte k = 0;
  for (byte z = 0; z < cmd.length(); z++) {
    if (cmd.charAt(z) == '|')
      k++;
    else if (cmd.charAt(z) != '\n' && cmd.charAt(z) != '*') 
      MsgArray[k].concat(cmd.charAt(z));
  }

  for (byte i_temp = 0; i_temp < array_len; i_temp++) {
    DEBUG_PRINT_F("globals.h: MSG_PARSE(): Parameter: ");
    DEBUG_PRINTLN(MsgArray[i_temp]);
    words[i_temp] = MsgArray[i_temp];
  }

  return;
}

void handlePingEvent(void)
{
  bool ret = Ping.ping(remoteIp);
  DEBUG_PRINT_F("globals.h: handlePingEvent(): Ping result to remore server ");
  DEBUG_PRINT(remoteIp);
  DEBUG_PRINT_F(": ");
  DEBUG_PRINTLN(ret);

  DEBUG_PRINT_F("globals.h: handlePingEvent(): Ping average time response ");
  DEBUG_PRINT(remoteIp);
  DEBUG_PRINT_F(": ");
  DEBUG_PRINTLN(ret);
  float avg_time_ms = Ping.averageTime();
  DEBUG_PRINTLN(avg_time_ms);

}

void handleHttpGetAllEvent(void)
{
  String GetAllDataHttpRequest = "/api/rawdata/getAll";

  if(WiFi.status()== WL_CONNECTED)
  {
    HTTPClient http;
    String serverPath = serverName + GetAllDataHttpRequest;

    // Your Domain name with URL path or IP address with path
    http.begin(serverPath.c_str());

    // If you need Node-RED/server authentication, insert user and password below
    //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");

    // Send HTTP GET request
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) 
    {
      String payload = http.getString();
      DEBUG_PRINT_F("globals.h: handleHttpGetAllEvent(): HTTP Response code: ");
      DEBUG_PRINTLN(httpResponseCode);
      DEBUG_PRINT_F("globals.h: handleHttpGetAllEvent(): HTTP Response payload: ");
      DEBUG_PRINTLN(payload);
    }
    else 
    { 
      DEBUG_PRINT_F("globals.h: handleHttpGetAllEvent(): Error code: ");
      DEBUG_PRINTLN(httpResponseCode);
    }
    // Free resources
    http.end();
  }
  else 
  {
    DEBUG_PRINTLN_F("globals.h: handleHttpGetAllEvent(): WiFi Disconnected");
  }

}

void handleHttpGetStatusEvent(void)
{
  String GetStatusHttpRequest = "/api/status";

  if(WiFi.status()== WL_CONNECTED)
  {
    HTTPClient http;
    String serverPath = serverName + GetStatusHttpRequest;

    // Your Domain name with URL path or IP address with path
    http.begin(serverPath.c_str());

    // If you need Node-RED/server authentication, insert user and password below
    //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");

    // Send HTTP GET request
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) 
    {
      String payload = http.getString();
      DEBUG_PRINT_F("globals.h: handleHttpGetStatusEvent(): HTTP Response code: ");
      DEBUG_PRINTLN(httpResponseCode);
      DEBUG_PRINT_F("globals.h: handleHttpGetStatusEvent(): HTTP Response payload: ");
      DEBUG_PRINTLN(payload);
    }
    else 
    { 
      DEBUG_PRINT_F("globals.h: handleHttpGetStatusEvent(): Error code: ");
      DEBUG_PRINTLN(httpResponseCode);
    }
    // Free resources
    http.end();
  }
  else 
  {
    DEBUG_PRINTLN_F("globals.h: handleHttpGetStatusEvent(): WiFi Disconnected");
  }

}

void handleHttpPostInsertEvent(void)
{
  if(WiFi.status()== WL_CONNECTED)
  {
    WiFiClient client;
    HTTPClient http;
  
    // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);
    
    // If you need Node-RED/server authentication, insert user and password below
    //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
    
    // Specify content-type header
    // http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    // Data to send with HTTP POST
    String httpRequestData = "api_key=tPmAT5Ab3j7F9&sensor=BME280&value1=24.25&value2=49.54&value3=1005.14";           
    // Send HTTP POST request
    // int httpResponseCode = http.POST(httpRequestData);
    
    // If you need an HTTP request with a content type: application/json, use the following:
    http.addHeader("Content-Type", "application/json");
    uint16_t desc_number = random(10000);
    int httpResponseCode = http.POST("{\"value\":\""+ String(desc_number) +"\",\"desc\":\"pippo-ali\",\"type\":\"pluto-ali\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");


    // If you need an HTTP request with a content type: text/plain
    //http.addHeader("Content-Type", "text/plain");
    //int httpResponseCode = http.POST("Hello, World!");
    
    DEBUG_PRINT_F("globals.h: handleHttpPostInsertEvent(): HTTP Response code: ");
    DEBUG_PRINTLN(httpResponseCode);
      
    // Free resources
    http.end();
  }
  else {
    DEBUG_PRINTLN_F("globals.h: handleHttpPostInsertEvent(): WiFi Disconnected");
  }

}
