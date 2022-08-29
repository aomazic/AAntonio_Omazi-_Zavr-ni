
#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#define API_KEY "AIzaSyDsSCZYlKAseOragmEPxZb0SJ_0vsCuYOE"
#define FIREBASE_PROJECT_ID "wine-cellar-monitor-d7139"






// Insert your  credentials
#define WIFI_SSID "Your Wifi WIFI ssid"
#define WIFI_PASSWORD "Your WIFI password"
#define USER_EMAIL "Your Email"
#define USER_PASSWORD "Your password"
#define USER_Uid "Your Uid"




FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
bool taskCompleted = false;
unsigned long dataMillis = 0;
int count = 0;

// The Firestore payload upload callback function
void fcsUploadCallback(CFS_UploadStatusInfo info)
{
    if (info.status == fb_esp_cfs_upload_status_init)
    {
        Serial.printf("\nUploading data (%d)...\n", info.size);
    }
    else if (info.status == fb_esp_cfs_upload_status_upload)
    {
        Serial.printf("Uploaded %d%s\n", (int)info.progress, "%");
    }
    else if (info.status == fb_esp_cfs_upload_status_complete)
    {
        Serial.println("Upload completed ");
    }
    else if (info.status == fb_esp_cfs_upload_status_process_response)
    {
        Serial.print("Processing the response... ");
    }
    else if (info.status == fb_esp_cfs_upload_status_error)
    {
        Serial.printf("Upload failed, %s\n", info.errorMsg.c_str());
    }
}

void setup()
{

    Serial.begin(9600);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();
    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
    config.api_key = API_KEY;
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;
    config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

#if defined(ESP8266)
    fbdo.setBSSLBufferSize(2048 /* Rx buffer size in bytes from 512 - 16384 */, 2048 /* Tx buffer size in bytes from 512 - 16384 */);
#endif
    fbdo.setResponseSize(2048);
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);














    
  



//Your setup() here

pinMode(LED_BUILTIN, OUTPUT);


}



void loop()
{       
  if (Firebase.ready() && (millis() - dataMillis > 60 || dataMillis == 0))
    {
        dataMillis = millis();
 if (!taskCompleted){
        taskCompleted = true;
        FirebaseJson content;
        String documentPath = "ArduinoVarijable/" +String(USER_Uid);
        String doc_path;
        doc_path += FIREBASE_PROJECT_ID;
        doc_path += "/databases/(default)/documents/ArduinoVarijable/" + String(USER_Uid); // coll_id and doc_id are your collection id and document id
        content.set("fields/docName/stringValue", String(USER_Uid));
        content.set("fields/var2/stringValue", "0");
        content.set("fields/var3/stringValue", "0");
        content.set("fields/var4/stringValue", "0");
        content.set("fields/var5/stringValue", "0");
        content.set("fields/var6/stringValue", "0");
        content.set("fields/var7/stringValue", "0");
        content.set("fields/var8/stringValue", "0");
        content.set("fields/var9/stringValue", "0");
        content.set("fields/var10/stringValue", "0");
        count++;

        Serial.print("Create a document... ");

        if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "" /* databaseId can be (default) or empty */, documentPath.c_str(), content.raw()))
            Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
        else
            Serial.println(fbdo.errorReason());

 }

       String documentPath = "ArduinoVarijable/" + String(USER_Uid);
  








          // Write code in this if statment to get data from server

        if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str())){   
            FirebaseJson payload; 
            payload.setJsonData(fbdo.payload().c_str());
            FirebaseJsonData jsonData;
            payload.get(jsonData, "fields/var2/stringValue", true); //Get var2 data example
            String str = jsonData.stringValue;
            if (str == "1") // Led ON/Of example
            digitalWrite(LED_BUILTIN, HIGH);
            else 
            digitalWrite(LED_BUILTIN, LOW);  
            }
        else
            Serial.println(fbdo.errorReason());
       







    }

      
    

}
