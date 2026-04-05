#include <SoftwareSerial.h>

SoftwareSerial BT(2,3);

#define FSR A0
#define LED 6
#define BUZZER 5

int threshold = 7;
bool alreadyTriggered = false;

// Timer variables
unsigned long previousMillis = 0;
const long interval = 30000; // 2 minutes = 120000 ms

char currentState = '0'; // store current helmet status

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  BT.begin(9600);
}

void loop() {

  int pressure = analogRead(FSR);

  // Helmet worn (trigger once)
  if (pressure > threshold && !alreadyTriggered) {

    for (int i = 0; i < 2; i++) {
      digitalWrite(LED, HIGH);
      digitalWrite(BUZZER, HIGH);
      delay(300);

      digitalWrite(LED, LOW);
      digitalWrite(BUZZER, LOW);
      delay(300);
    }

    currentState = '1';   // update state
    BT.write(currentState);

    alreadyTriggered = true;
  }

  // Helmet removed
  else if (pressure <= threshold) {
    alreadyTriggered = false;
    currentState = '0';   // update state
  }

  // ⏱ Send data every 2 minutes
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    BT.write(currentState);  // send latest state
  }

  delay(100);
}
