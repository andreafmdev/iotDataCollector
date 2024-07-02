
//------------------------- DEFINE --------------------//
/**
 * 
 * @file utils.h
 * @author Alessandro Alinovi
 * @date 2023-09-01
 * @version 0.0.1
 * @copyright Copyright (c) 2023
 * @brief Esp-8266 library for handling functions
 * 
*/

/**
 * @brief Init WiFi periperal
 * @param [in] mode to set the peripheral, AP, STA, AP_STA
 * @param [in] ssid name of the wifi network
 * @param [in] password password of the wifi network
 * @param [in] tx_power tx power of the periheral from 8->2dBm to 80->20dBm
 */
int init_wifi(WiFiMode_t mode, char* ssid, char* password, float tx_power = 0)
{
    const uint16_t TIMEOUT_WIFI_INIT = 20000;

    set_SSID_name(ssid);
    set_pwd_string(password);
    set_tx_power(tx_power);

    if (WiFi.isConnected())
    {
        WiFi.disconnect();
    }

    WiFi.mode(mode);

    switch (mode)
    {
    case WIFI_AP:
        WiFi.enableAP(true);
        WiFi.enableSTA(false);
        WiFi.softAP((String) ("ESP32-" + WiFi.macAddress()));
        WiFi.softAPConfig(local_IP_inSoftAP, gateway_inSoftAP, subnet_inSoftAP);
        break;
    case WIFI_STA:
        WiFi.enableAP(false);
        WiFi.enableSTA(true);
        break;
    case WIFI_AP_STA:
        WiFi.enableAP(true);
        WiFi.enableSTA(true);
        WiFi.softAP((String) ("ESP32-" + WiFi.macAddress()));
        WiFi.softAPConfig(local_IP_inSoftAP, gateway_inSoftAP, subnet_inSoftAP);
        break;            
    default:
        break;
    }

    WiFi.begin(ssid, password);

    DEBUG_PRINT_F("utils.h: init_wifi(): Connecting to WiFi");
    long startCheckConnection = millis();

    while ( WiFi.status() != WL_CONNECTED && (millis() - startCheckConnection < TIMEOUT_WIFI_INIT)) 
    {
        delay(500);
        DEBUG_PRINT_F(".");
    }
    if (millis() - startCheckConnection >= TIMEOUT_WIFI_INIT)
    {
        reset_device(DELAY_REBOOT, "utils.h: init_wifi()", "Timeout connection. ESP will restart...");        
    }

    DEBUG_PRINTLN_F("\n");
    DEBUG_PRINTLN_F("utils.h: init_wifi(): Connection established!");
    DEBUG_PRINT_F("utils.h: init_wifi(): IP address: ");
    DEBUG_PRINTLN(WiFi.localIP());
    DEBUG_PRINT_F("utils.h: init_wifi(): RSSI: ");
    DEBUG_PRINTLN(WiFi.RSSI());


    // char msg_to_send[TCP_MAX_MTU]= "";
    // strcat(msg_to_send, MATRICOLA_MACHINE);
    // strcat(msg_to_send, "|");
    // strcat(msg_to_send, MESSAGE_CONN);
    // strcat(msg_to_send, "|");
    // strcat(msg_to_send, (WiFi.localIP()).toString().c_str());
    // strcat(msg_to_send, "|");
    // strcat(msg_to_send, MATRICOLA_MACHINE);

    // String resp = Send_Message_Out(msg_to_send);                               /* Message sent throught Send_message_Out() example: S01|M3111|10.30.0.1|Axxx-xxxx*/
    // strcat(msg_to_send, "|MC200");

    // /* Example: 1695889529211|A999-99999|M3111|192.168.127.109|A999-99999|MC200 */
    // String serverTime = resp.substring(0, 13);
    // DEBUG_PRINTLN(serverTime);
    
    // resp = resp.substring(14);
    // if (strcmp(resp.c_str(), msg_to_send) != 0)
    // {
    //     reset_device(DELAY_REBOOT, "utils.h: init_wifi()", "Wrong registration from server side. ESP will restart...");
    //     return SERVER_REGISTER_CONFIRM_ERR;
    // }
    
    // updateServerSynch(serverTime);

    return 0;
}

void reset_device(uint16_t delay_ms, String prefix_functionCaller, String log_err_msg)
{
    // queue_msg = xQueueCreate(10, sizeof(int));
    // sendQueue(queue_msg, (char*) L_ALARM, "utils.h: reset_device()");

    DEBUG_PRINT_F("utils.h: reset_device(): ");
    DEBUG_PRINT(prefix_functionCaller);
    DEBUG_PRINT_F(": ");
    DEBUG_PRINTLN(log_err_msg);
    
    delay(delay_ms);
    ESP.restart();
}

int8_t updateServerSynch(String lastSynchTime)
{
    data temp;

    DEBUG_PRINT_F("utils.h: updateServerSynch(): Update value in eeprom device with: ");
    DEBUG_PRINTLN(lastSynchTime);
    for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
    {
        if (String(d_eeprom[ii].data_name) == String("LAST_SYNCH"))
        {
            DEBUG_PRINT_F("utils.h: updateServerSynch(): Value found: ");
            DEBUG_PRINTLN(d_eeprom[ii].data_string);
            memcpy(&temp, &d_eeprom[ii], sizeof(temp));
            strcpy(temp.data_string, lastSynchTime.c_str()); 
            eeprom_storeStruct(&temp, sizeof(temp), ii * sizeof(temp) + 1);
            DEBUG_PRINTLN_F("utils.h: updateServerSynch(): Update stored");
            return 0;
        }
    }
    DEBUG_PRINTLN_F("utils.h: updateServerSynch(): Value Not found in the data struct array...");
    return -1;
}

String CMD_HANDLER(String words[], uint8_t words_num)
{
    String res = "";

    DEBUG_PRINT_F("utils.h: CMD_HANDLER(): ");
    DEBUG_PRINTLN(words[1]);
    
    res = words[1] + "|";

    if (words[1] == "GET_SSID")
    {
        return d_eeprom[1].data_string;
    }
    else if (words[1] == "SET_SSID")
    {
        String new_ssid = words[2];
        data temp;

        for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
        {
            if (String(d_eeprom[ii].data_name) == String("SSID"))
            {
                DEBUG_PRINT_F("utils.h: CMD_HANDLER(): Value found: ");
                DEBUG_PRINTLN(d_eeprom[ii].data_string);
                memcpy(&temp, &d_eeprom[ii], sizeof(temp));
                strcpy(temp.data_string, new_ssid.c_str()); 
                eeprom_storeStruct(&temp, sizeof(temp), ii * sizeof(temp) + 1);
                DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Update stored");

                res += String(COK);
                return res;
            }
        }
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Value Not found in the data struct array...");
        res += String(CNE);
    
        return res;
    }
    else if (words[1] == "RESET")
    {
        uint16_t delay = (uint16_t) atoi(words[2].c_str());
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Reset scheduled...");
        reset_device(delay, "utils.h: CMD_HANDLER()", "Reset command received. ESP will restart...");

        res += String(COK);
        return res;
    }
    else if (words[1] == "SAVE_MEM")
    {
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Save parameter in eeprom memory");
        eeprom_commit();

        res += String(COK);
        return res;
    }
    else if (words[1] == "CLEAR_MEM")
    {
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Delete parameter in eeprom memory");
        eeprom_clear();
        res += String(COK);
        return res;
    }
    else if (words[1] == "GET_MEM_OBJ")
    {
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Get memory object from eeprom memory");
        uint8_t obj_num      = (uint8_t) atoi(words[2].c_str());

        res +=  "{" 
                + (String) d_eeprom[obj_num].index_addr + ", " 
                + d_eeprom[obj_num].data_name + ", "
                + (String)d_eeprom[obj_num].data_value + ", "
                + d_eeprom[obj_num].data_string +
                "}";
                     
        return res;
    }
    else if (words[1] == "SET_ESP_MODE")
    {
        WiFiMode_t new_mode      = (WiFiMode_t) atoi(words[2].c_str());
        data temp;

        for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
        {
            if (String(d_eeprom[ii].data_name) == String("ESP_MODE"))
            {
                DEBUG_PRINT_F("utils.h: CMD_HANDLER(): Value found: ");
                DEBUG_PRINTLN(d_eeprom[ii].data_value);
                memcpy(&temp, &d_eeprom[ii], sizeof(temp));
                temp.data_value = new_mode;
                eeprom_storeStruct(&temp, sizeof(temp), ii * sizeof(temp) + 1);
                DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Update stored");

                res += String(COK);
                return res;
            }
        }
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Value Not found in the data struct array...");
        res += String(CNE);

        return res;
    }
    else if (words[1] == "GET_WIFI_PWD")
    {
        res += d_eeprom[2].data_string;
        return res;
    }
    else if (words[1] == "SET_WIFI_PWD")
    {
        String new_pwd = words[2];
        data temp;

        for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
        {
            if (String(d_eeprom[ii].data_name) == String("WIFI_PWD"))
            {
                DEBUG_PRINT_F("utils.h: CMD_HANDLER(): Value found: ");
                DEBUG_PRINTLN(d_eeprom[ii].data_string);
                memcpy(&temp, &d_eeprom[ii], sizeof(temp));
                strcpy(temp.data_string, new_pwd.c_str()); 
                eeprom_storeStruct(&temp, sizeof(temp), ii * sizeof(temp) + 1);
                DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Update stored");

                res += String(COK);
                return res;
            }
        }
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Value Not found in the data struct array...");
        res += String(CNE);
        return res;
    }
    else if (words[1] == "GET_STA_IP")
    {
        res += d_eeprom[3].data_string;
        return res;
    }
    else if (words[1] == "SET_STA_IP")
    {
        String newIP = words[2];
        data temp;

        for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
        {
            if (String(d_eeprom[ii].data_name) == String("LOC_SERVER_IP"))
            {
                DEBUG_PRINT_F("utils.h: CMD_HANDLER(): Value found: ");
                DEBUG_PRINTLN(d_eeprom[ii].data_string);
                memcpy(&temp, &d_eeprom[ii], sizeof(temp));
                strcpy(temp.data_string, newIP.c_str()); 
                eeprom_storeStruct(&temp, sizeof(temp), ii * sizeof(temp) + 1);
                DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Update stored");

                res += String(COK);
                return res;
            }
        }
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Value Not found in the data struct array...");
        res += String(CNE);
        return res;
    }
    else if (words[1] == "GET_TX_POW")
    {
        res += (String) get_tx_power();
        return res;
    }
    else if (words[1] == "SET_TX_POW")
    {
        uint8_t new_tx_power = (uint8_t) atoi(words[2].c_str());
        data temp;

        for (uint8_t ii = 0; ii < DATA_STRUCT_TO_STORE; ii++)
        {
            if (String(d_eeprom[ii].data_name) == String("TX_POWER"))
            {
                DEBUG_PRINT_F("utils.h: CMD_HANDLER(): Value found: ");
                DEBUG_PRINTLN(d_eeprom[ii].data_string);
                memcpy(&temp, &d_eeprom[ii], sizeof(temp));
                temp.data_value = new_tx_power;
                eeprom_storeStruct(&temp, sizeof(temp), ii * sizeof(temp) + 1);
                DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Update stored");

                res += String(COK);
                return res;
            }
        }
        DEBUG_PRINTLN_F("utils.h: CMD_HANDLER(): Value Not found in the data struct array...");
        res += String(CNE);
        return res;
    }

    res += String(CNE);
    DEBUG_PRINT_F("utils.h: CMD_HANDLER(): Command error: ");
    DEBUG_PRINTLN(res);

    return res;
}

