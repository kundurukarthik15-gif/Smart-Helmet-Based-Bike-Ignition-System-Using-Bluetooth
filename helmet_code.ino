#include <SoftwareSerial.h>

SoftwareSerial BT(2,3);

#define FSR A0
#define LED 6
#define BUZZER 5

int threshold = 300;

void setup() {

  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  BT.begin(9600);
}

void loop() {

  int pressure = analogRead(FSR);

  if (pressure > threshold) {

    digitalWrite(LED, HIGH);
    digitalWrite(BUZZER, HIGH);

    BT.write('1');   // helmet worn
  }

  else {

    digitalWrite(LED, LOW);
    digitalWrite(BUZZER, LOW);

    BT.write('0');   // helmet removed
  }

  delay(200);
}
