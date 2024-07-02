/**
 * 
 * @file Connection_Lib.h
 * @author Alessandro Alinovi
 * @date 2024-06-26
 * @version 0.0.1
 * @copyright Copyright (c) 2023
 * @brief Wi-Fi connection method and data
 * 
*/

#include <WiFi.h>
#include <WiFiGeneric.h>
#include <WiFiClient.h>
#include <stdlib.h>

/** @brief Wifi network name */
char ssid[255] = "SAM-Net";

/** @brief Wifi password */
char password[255] = "SAM-Net_2019!!!";

/** @brief Server ip address */
char outsideserverip[16] = "192.168.127.2"; 
IPAddress OutSideServer(192, 168, 127, 2);

/** @brief ESP ip address */
IPAddress localip = IPAddress(0, 0, 0, 0);

/** @brief Server ip address in AP mode */
IPAddress local_IP_inSoftAP(192, 168, 0, 1);

/** @brief Gateway in AP mode */
IPAddress gateway_inSoftAP(0, 0, 0, 0);

/** @brief Subnet mask in AP mode */
IPAddress subnet_inSoftAP(255, 255, 255, 0);

/** @brief Tx power [dBm] */
int8_t tx_power = 0; 

/** @brief TCP max MTU size */
#define TCP_MAX_MTU 255

/** @brief Last message received from TCP_SERVER or as response of TCP_CLIENT */
byte LAST_MSG_RECEIVED[TCP_MAX_MTU];

/** @brief Last message sent to the server by TCP_CLIENT */
byte LAST_MSG_TO_SEND[TCP_MAX_MTU];

/** @brief Length of LAST_MSG_RECEIVED */
unsigned int LAST_MSG_RECEIVED_LEN = 0;

/** @brief Length of LAST_MSG_TO_SEND */
unsigned int LAST_MSG_TO_SEND_LEN = 0;

/** @brief Port on wich ESP will be listening */
#define IN_SIDE_PORT 9060

/** @brief Server TCP port on wich ESP will be send requests */
#define OUT_SIDE_PORT 9061

/** @brief Maximum time during which ESP tries the Wifi connection */
#define WIFI_TIMEOUT_CONNECTION 30000

/** @brief Maximum time to wait client trasmit data after connection */
#define MAX_WAIT_CLIENT_TRASMISSION 5000

/** @brief Maximum time to wait server response */
#define MAX_WAIT_SERVER_RESPONSE 30000

/** @brief Delay between each connection check */
#define CHECK_CONNECTION_DELAY 60000

/** @brief Mnemonic for TCP_CLIENT response */
#define TCP_CLIENT_OK 200

/** @brief Mnemonic for TCP_CLIENT response */
#define TCP_CLIENT_ERR_NORESPONSE 404

/** @brief Mnemonic for TCP_CLIENT response */
#define TCP_CLIENT_ERR_CONNREFUSED 500

/** @brief Mnemonic for TCP_SERVER response */
#define TCP_RESP_OK 200

/** @brief  Used for check wifi connection status */
unsigned long pollingWifiConnectionCheck = 0;

/** @brief Create a TCP Server instance on port IN_SIDE_PORT (each ESP got this port) */
WiFiServer server(IN_SIDE_PORT);

/* Start Server service */
void start_server()
{
  server.begin();
}

/* Stop Server service */
void stop_server()
{
  server.stop();
}

/* Is available Server service */
void available_server()
{
  server.available();
}

/* Has Client connected Server service */
bool hasClient_server()
{
  return server.hasClient();
}

/* Get Tx power device value */
float get_tx_power()
{
  DEBUG_PRINT_F("Connection_lib.h get_tx_power(): ");
  DEBUG_PRINTLN(tx_power);
  return tx_power;
}

/* Set Tx power device value */
void set_tx_power(int8_t new_tx_power)
{
  tx_power = new_tx_power;
  WiFi.setTxPower((wifi_power_t ) new_tx_power);
  DEBUG_PRINT_F("Connection_lib.h set_tx_power(): ");
  DEBUG_PRINTLN(tx_power);
}

/* Get SSID Network value */
String get_SSID_name()
{
  DEBUG_PRINT_F("Connection_lib.h get_SSID_name(): ");
  DEBUG_PRINTLN(ssid);
  return ssid;
}

/* Set SSID network value */
void set_SSID_name(String new_ssid)
{
  strcpy(ssid, new_ssid.c_str());
  DEBUG_PRINT_F("Connection_lib.h set_SSID_name(): ");
  DEBUG_PRINTLN(new_ssid);
}

/* Get password string value */
String get_pwd_string()
{
  DEBUG_PRINT_F("Connection_lib.h get_pwd_string(): ");
  DEBUG_PRINTLN(password);
  return password;
}

/* Set password string value */
void set_pwd_string(String new_pwd)
{
  strcpy(password, new_pwd.c_str());
  DEBUG_PRINT_F("Connection_lib.h set_pwd_string(): ");
  DEBUG_PRINTLN(new_pwd);
}

/* Get MAC Address value */
String get_MAC_address()
{
  DEBUG_PRINTLN_F("Connection_lib.h get_MAC_address(): ");
  return WiFi.macAddress();
}

/* Set Local IP Address variable */
void set_localIP()
{
  localip = WiFi.localIP();
  DEBUG_PRINT_F("Connection_lib.h set_localIP(): ");
  DEBUG_PRINTLN(localip);
}

/* Get local IP Address value variable */
IPAddress get_localIP()
{
  DEBUG_PRINT_F("Connection_lib.h get_localIP(): ");
  DEBUG_PRINTLN(localip);

  return localip;
}

/**
 * @brief Connect to registered wifi network
 * @details Start connection to wifi network. A connection attempt will be made every 500ms for a maximum of WIFI_TIMEOUT_CONNECTION ms
 */
void WifiConnect()
{
  // Used to timeout connectin operation
  unsigned long startCheckConnection = millis();
  
  // Set Wi-Fi mode (Station, AP, Station+AP) -> Station
  WiFi.mode(WIFI_STA);
  WiFi.enableAP(false);
  WiFi.enableSTA(true);

  // Starting wifi connection
  WiFi.begin(ssid, password);
  
  // Wait for connection or timeout
  while (WiFi.status() != WL_CONNECTED && millis() - startCheckConnection < WIFI_TIMEOUT_CONNECTION)
  {
    delay(500);
    DEBUG_PRINT_F("Connection_lib.h WifiConnect(): WiFi.status() =  ");
    DEBUG_PRINTLN(WiFi.status());
  }

  if (WiFi.status() == WL_CONNECTED)
  {
    DEBUG_PRINT_F("Connection_lib.h WifiConnect(): Connected to (SSID): ");
    DEBUG_PRINTLN(ssid);
    DEBUG_PRINT_F("Connection_lib.h WifiConnect(): IP Address: ");
    DEBUG_PRINTLN(WiFi.localIP());

    set_localIP();
  }
  else
  {
    DEBUG_PRINT_F("Connection_lib.h WifiConnect(): Unable to connected to ");
    DEBUG_PRINTLN(ssid);
  }
}

/**
 * @brief Check status of connection each CHECK_CONNECTION_DELAY ms
 * @see CHECK_CONNECTION_DELAY
 */
void CheckConnection()
{

  if (millis() - pollingWifiConnectionCheck > CHECK_CONNECTION_DELAY)
  {
    DEBUG_PRINT_F("Connection_lib.h CheckConnection(): Check WiFi Connection: ");

    if (WiFi.status() != WL_CONNECTED)
    {
      WifiConnect();

      server.begin();
    }
    else
    {
      DEBUG_PRINTLN_F("Connected ");
      DEBUG_PRINT_F("Connection_lib.h CheckConnection(): WiFi Network RSSI: ");
      DEBUG_PRINTLN(WiFi.RSSI());
      pollingWifiConnectionCheck = millis();
    }
  }
}

/**
 * @brief TCP server handling function.
 * @details For each tcp client connected, ESP receives data and stores it in LAST_MESSAGE_RECEIVED
 * @see LAST_MESSAGE_RECEIVED
 */
void TCPServer(String &dataFromTCP)
{
  const uint8_t WORDS_EXPECTED = 6;
  uint8_t words_len;
  
  if (WiFi.status() != WL_CONNECTED)
  {
    DEBUG_PRINT_F("Connection_lib.h TCPServer(): WiFi.status(): ");
    DEBUG_PRINTLN(WiFi.status());

    return;
  }

  // Istance the client Object to handle remote client (if present)
  WiFiClient client = server.accept(); // changed from .available()

  // There is a client connected
  if (client)
  {
    
    if (client.connected())
    {
      DEBUG_PRINTLN_F("Connection_lib.h TCPServer(): Client connected");
      DEBUG_PRINT_F("Connection_lib.h TCPServer(): WiFi Network RSSI: ");
      DEBUG_PRINTLN(WiFi.RSSI());
      int cnt = 0;

      // Waiting for server response
      while (client.available() == 0 && cnt < MAX_WAIT_CLIENT_TRASMISSION)
      {
        cnt++;
        delay(1);
      }

      // There is a client's message
      if (client.available() > 0)
      {
        // Retrieve how byte client sent
        byte act_client_available = client.available();
        byte old_client_available = 0;
        byte cnt_1 = 0;
        
        // Threashold for stop waiting byte coming from client
        byte maxAttempt = 5;
        
        // Continue reading until bytes end to come
        while (cnt_1 < maxAttempt)
        {
          old_client_available = act_client_available;
          delay(1);
          act_client_available = client.available();
          if (old_client_available == act_client_available)
            cnt_1++;
          else
            cnt_1 = 0;
        }

        String inChar = "";

        // Read incoming message from client stream
        for (int i = 0; i < act_client_available; i++)
          inChar += (String)((char) client.read());
          
        DEBUG_PRINTLN("Connection_lib.h TCPServer(): Msg from client: " + inChar);
        
        String words[WORDS_EXPECTED];
        MSG_PARSE(inChar, words ,words_len);

        if (words[0] == "ESP")
        {
          /* Command or stream for Esp device */
          DEBUG_PRINTLN_F("Connection_lib.h: TCPServer(): dataStream for esp side ");
          String ret = CMD_HANDLER(words, words_len);
  
          client.print("|" + ret);
        }
        else
        {
          /* data stream for Host side */
          dataFromTCP = "";

          for (uint8_t ii = 0; ii < act_client_available; ii++)
          {
            dataFromTCP += (String) inChar[ii];
          }

          // Send "Ok" to the client
          client.print(String(COK));
        }
        
        // Waiting for the client response outcome before continue
        client.flush();        
      }
      else
      {
        String inChar = "ERROR_NO_DATA_FROM_CLIENT";
        return;
      }
    }
  }

}

/**
 * @brief Send Mex to server and stores response/error code in OutMex byte array, which could be processed by the caller
 * @param [in] Mex Mesage to be sent
 * @param [out] OutMex Response message or error if present
 * @return int - Number that represents status of TCP request
 * @see TCP_CLIENT_OK,TCP_CLIENT_ERR_NORESPONSE,TCP_CLIENT_ERR_CONNREFUSED for available return values
 */
int TCP_Client(String Mex, byte OutMex[])
{
  // Server Ip Address on which ESP sends requests
  // IPAddress OutSideServer(10, 30, 1, 106);  // AA: Used for local test

  // Instance of a raw wifi client that could write/read over stream
  WiFiClient local_client;
  if (local_client.connect(OutSideServer, OUT_SIDE_PORT))
  {
    DEBUG_PRINT_F("Connection_lib.h: TCP_Client(): Connected to server");
    DEBUG_PRINTLN(OutSideServer);
    DEBUG_PRINT_F("Connection_lib.h: TCP_Client(): Port = ");
    DEBUG_PRINTLN(OUT_SIDE_PORT);

    for (uint8_t i = 0; i < TCP_MAX_MTU; i++)
    {
      if (i < (byte)Mex.length())
        LAST_MSG_TO_SEND[i] = Mex.charAt(i);
      else
        LAST_MSG_TO_SEND[i] = 0;
    }
    LAST_MSG_TO_SEND_LEN = Mex.length();

    // Make a TCP request to server
    local_client.print(Mex);

    int cnt = 0;
    
    // wait for server send response
    while (local_client.available() == 0 && cnt < MAX_WAIT_SERVER_RESPONSE)
    {
      cnt++;
      delay(1);
      // if (cnt > 1000)
        //ReceiveFromSerial();
    }

    // There is a client message
    if (local_client.available() > 0)
    {
      byte act_client_available = local_client.available();
      byte old_client_available = 0;
      byte cnt_1 = 0;
      
      // waiting for all incoming bytes arriving
      while (cnt_1 < 5)
      {
        old_client_available = act_client_available;
        delay(1);
        act_client_available = local_client.available();
        if (old_client_available == act_client_available)
          cnt_1++;
        else
          cnt_1 = 0;
      }

      String inChar = "";
      
      // Read incoming message
      for (int i = 0; i < act_client_available; i++)
        inChar += (String)((char)local_client.read());

      // Echo response from serever on Serial monitor
      DEBUG_PRINTLN(inChar);

      for (uint8_t i = 0; i < TCP_MAX_MTU; i++)
      {
        if (i < (byte)inChar.length())
          LAST_MSG_RECEIVED[i] = inChar.charAt(i);
        else
          LAST_MSG_RECEIVED[i] = 0;
      }
      LAST_MSG_RECEIVED_LEN = inChar.length();

      return TCP_CLIENT_OK;
    }
    else
    {
      DEBUG_PRINTLN_F("Connection_lib.h: TCP_Client() Error no response from server");
      String inChar = "ERROR_TCP_CLIENT_ERR_NORESPONSE";
      for (uint8_t i = 0; i < TCP_MAX_MTU; i++)
        if (i < (byte)inChar.length())
          LAST_MSG_RECEIVED[i] = inChar.charAt(i);
        else
          LAST_MSG_RECEIVED[i] = 0;
      LAST_MSG_RECEIVED_LEN = inChar.length();
      return TCP_CLIENT_ERR_NORESPONSE;
    }
  }
  else
  {
    DEBUG_PRINTLN_F("Connection_lib.h: TCP_Client(): Error connecting to the server");
    String inChar = "ERROR_TCP_CLIENT_ERR_CONNREFUSED";
    for (uint8_t i = 0; i < TCP_MAX_MTU; i++)
      if (i < (byte)inChar.length())
        LAST_MSG_RECEIVED[i] = inChar.charAt(i);
      else
        LAST_MSG_RECEIVED[i] = 0;
    LAST_MSG_RECEIVED_LEN = inChar.length();
    return TCP_CLIENT_ERR_CONNREFUSED;
  }
}

/**
 * @brief Send message over TCP to server end stores response to be available for connected MCU
 * @param [in] Mex Message message can be up to 255 characters long, characters exceeding will be discarded
 */
String Send_Message_Out(String Mex)
{
  uint8_t l = TCP_MAX_MTU;
  char temp[l]; // 1
  for (int i = 0; i < l; i++)
    temp[i] = ' ';
  for (int i = 0; i < l; i++)
    if (Mex.charAt(i) != '\n')
      temp[i] = Mex.charAt(i);

  if (!TCP_Client(Mex, LAST_MSG_RECEIVED))
  {
    String tempS = "ERROR_SENDING";

    // Reset the last message sent to the server historicized
    for (uint8_t i = 0; i < TCP_MAX_MTU; i++)
      LAST_MSG_RECEIVED[i] = 0;

    // Historicize message sent to the server
    for (uint8_t i = 0; i < tempS.length(); i++)
      LAST_MSG_RECEIVED[i] = tempS.charAt(i);

    LAST_MSG_RECEIVED_LEN = tempS.length();
    DEBUG_PRINTLN(LAST_MSG_RECEIVED_LEN);

  }

  char temp_buf[sizeof(LAST_MSG_RECEIVED)] = "";
  memcpy(&temp_buf, &LAST_MSG_RECEIVED, sizeof(LAST_MSG_RECEIVED));

  // Reset the last message sent to the server historicized
  for (int i = 0; i < TCP_MAX_MTU; i++)
    LAST_MSG_TO_SEND[i] = 0;

  // Historicize message sent to the server
  for (int i = 0; i < l; i++)
    LAST_MSG_TO_SEND[i] = temp[i];

  LAST_MSG_RECEIVED_LEN = 0;

  return (String) temp_buf;
}
