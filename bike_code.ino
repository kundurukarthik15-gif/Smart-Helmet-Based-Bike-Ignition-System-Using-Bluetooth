#include <SoftwareSerial.h>

SoftwareSerial BT(2,3);

#define LED 6
#define MOTOR 7

char lastData = '0';  // store last received data

// Timer
unsigned long lastReceiveTime = 0;
const long timeout = 130000; // 2 min + buffer (130 sec)

void setup() {

  pinMode(LED, OUTPUT);
  pinMode(MOTOR, OUTPUT);

  digitalWrite(LED, LOW);
  digitalWrite(MOTOR, HIGH);   // motor OFF initially

  BT.begin(9600);
}

void loop() {

  // 📡 Check for incoming data
  if (BT.available()) {

    char data = BT.read();
    lastData = data;

    lastReceiveTime = millis();  // update time

    // Act immediately
    if (data == '1') {
      digitalWrite(LED, HIGH);
      digitalWrite(MOTOR, LOW);   // motor ON
    }

    else if (data == '0') {
      digitalWrite(LED, LOW);
      digitalWrite(MOTOR, HIGH);  // motor OFF
    }
  }

  // 🚨 Safety: if no data received for 2 minutes
  if (millis() - lastReceiveTime > timeout) {
    
    digitalWrite(LED, LOW);
    digitalWrite(MOTOR, HIGH);   // motor OFF for safety
  }

}
