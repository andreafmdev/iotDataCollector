
/**
 * 
 * @file Reference_caller.h
 * @author Alessandro Alinovi
 * @date 2024-06-26
 * @version 0.0.1
 * @copyright Copyright (c) 2024
 * @brief Put here all your declaration functions
 * 
*/

#include <string.h>
#include <IPAddress.h>

// #define DEBUG

/* globals.h */
void MSG_PARSE(String cmd, String words[], uint8_t &len);
void handlePingEvent(void);
void handleHttpGetAllEvent(void);
void handleHttpPostInsertEvent(void);

/* Connection_Lib.h */
void start_server();
void stop_server();
void available_server();
bool hasClient_server();
float get_tx_power();
void set_tx_power(int8_t new_tx_power);
String get_SSID_name();
void set_SSID_name(String new_ssid);
String get_pwd_string();
void set_pwd_string(String new_pwd);
String get_MAC_address();
void set_localIP();
IPAddress get_localIP();
void WifiConnect();
void CheckConnection();
void TCPServer(String &dataFromTCP);
int TCP_Client(String Mex, byte OutMex[]);
String Send_Message_Out(String Mex);

/* utils.h */
int init_wifi(WiFiMode_t mode, char* ssid, char* password, float tx_power);
void reset_device(uint16_t delay_ms, String prefix_functionCaller, String log_err_msg);
int8_t updateServerSynch(String lastSynchTime);
String CMD_HANDLER(/*Stream &Serial_port,*/ String words[], uint8_t words_num);

/* EEPROM_Lib.h */
void eeprom_init(uint16_t eeprom_size);
uint8_t eeprom_read(int eepromAddr);
void eeprom_write(int eepromAddr, uint8_t value);
void eeprom_write_string(uint16_t eepromAddr, String stringData);
String eeprom_read_string(int address); 
void eeprom_commit(); 
void eeprom_clear();
void eeprom_storeStruct(void *data_source, size_t size, int address);
void eeprom_loadStruct(void *data_dest, size_t size, int address);

/* Logibiotech_SerialCOM.h prototypes */
// void init_serial_COM(HardwareSerial &serialPort,unsigned long baudrate = 9600);
// void Send_StringCMD(Stream &serialPort, String strMessage);
// String Receive_StringCMD(Stream &serialPort);

/* FSMLib.h */
bool FSM_loop(uint8_t &fsm_state);
