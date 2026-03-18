#include <SoftwareSerial.h>

SoftwareSerial BT(2,3);

#define LED 6
#define MOTOR 7

void setup() {

  pinMode(LED, OUTPUT);
  pinMode(MOTOR, OUTPUT);

  digitalWrite(LED, LOW);
  digitalWrite(MOTOR, HIGH);   // relay OFF

  BT.begin(9600);
}

void loop() {

  if (BT.available()) {

    char data = BT.read();

    if (data == '1') {

      digitalWrite(LED, HIGH);
      digitalWrite(MOTOR, LOW);   // motor ON
    }

    if (data == '0') {

      digitalWrite(LED, LOW);
      digitalWrite(MOTOR, HIGH);  // motor OFF
    }

  }

}
