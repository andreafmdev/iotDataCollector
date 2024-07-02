/**
 * 
 * @file mqtt_Lib.h
 * @author Alessandro Alinovi
 * @date 2024-06-26
 * @version 0.0.1
 * @copyright Copyright (c) 2023
 * @brief Wi-Fi MQTT connection method and data
 * 
*/

#include <WiFi.h>
#include <WiFiGeneric.h>
#include <WiFiClient.h>
#include <stdlib.h>
#include <PubSubClient.h>

/* MQTT Broker */
char mqtt_broker[]          = "broker.emqx.io";
char topic[]                = "emqx/esp32";
char mqtt_username[]        = "emqx";
char mqtt_password[]        = "public";
uint16_t mqtt_port          = 1883;
uint16_t mqtt_secure_port   = 8883;

WiFiClient espClient;
PubSubClient client(espClient);

void set_mqttBrokerDomain(String newMqttBrokerDomain)
{
    strcpy(mqtt_broker, newMqttBrokerDomain.c_str());
    return;
}

String get_mqttBrokerDomain()
{
    return mqtt_broker;
}

void set_mqttTopic(String newTopic)
{
    strcpy(topic, newTopic.c_str());
    return;
}

String get_mqttTopic()
{
    return topic;
}

void set_mqttUsername(String newUsername)
{
    strcpy(mqtt_username, newUsername.c_str());
    return;
}

String get_mqttUsername()
{
    return mqtt_username;
}

void set_mqttPassword(String newPassword)
{
    strcpy(mqtt_password, newPassword.c_str());
    return;
}

String get_mqttPassword()
{
    return mqtt_password;
}

void callback(char *topic, byte *payload, unsigned int length) {
    DEBUG_PRINT_F("| mqtt_Lib.h: callback(): Message arrived in topic: ");
    DEBUG_PRINTLN(topic);
    DEBUG_PRINT_F("| Message: ");
    for (uint64_t i = 0; i < length; i++) 
    {
        DEBUG_PRINT((char) payload[i]);
    }
    DEBUG_PRINTLN("\n");
}

/* Mqtt broker connection */
void mqtt_broker_connection(char *client_id, char *mqtt_username, char *mqtt_password)    
{
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);

    while (!client.connected()) 
    {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        DEBUG_PRINT_F("mqtt_Lib.h: mqtt_broker_connection(): The client %s connects to the public MQTT broker \n");
        
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) 
        {
            DEBUG_PRINTLN_F("mqtt_Lib.h: mqtt_broker_connection(): Public EMQX MQTT broker connected");
        } 
        else 
        {
            DEBUG_PRINT_F("mqtt_Lib.h: mqtt_broker_connection(): Failed with state: ");
            DEBUG_PRINTLN(client.state());
            delay(500);
        }
    }   
}

void mqtt_pusblishOnTopic(char *topic, char *payload)
{
    client.publish(topic, payload);
}

void mqtt_subscribeOnTopic(char *topic)
{
    client.subscribe(topic);
}

void mqtt_unsubscribeOnTopic(char *topic)
{
    client.unsubscribe(topic);
}

void mqtt_disconnect()
{
    client.disconnect();
}

