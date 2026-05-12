# Smart Helmet with Bike Ignition Control System

## Overview

The **Smart Helmet with Bike Ignition Control System** is an IoT and embedded systems based safety project designed to improve road safety for bike riders. The system ensures that the bike ignition turns ON only when the rider wears the helmet properly. This project uses sensors, Bluetooth communication, Arduino microcontrollers, and a relay-controlled ignition mechanism.

The main objective of this project is to reduce accidents caused by riders not wearing helmets.

---

# Features

* Helmet detection using sensors
* Wireless communication using Bluetooth module
* Bike ignition control system
* Automatic ignition lock when helmet is not worn
* LED indication for system status
* Compact and low-cost safety solution
* Easy to install and maintain

---

# Problem Statement

Many road accidents occur due to riders not wearing helmets. Existing systems only warn the rider but do not prevent vehicle operation.

This project solves the issue by:

* Detecting whether the helmet is worn
* Allowing bike ignition only when the helmet is detected
* Improving rider safety and reducing accident risks

---

# Components Used

| Component                 | Purpose                      |
| ------------------------- | ---------------------------- |
| Arduino Uno               | Main microcontroller         |
| HC-05 Bluetooth Module    | Wireless communication       |
| IR Sensor / Touch Sensor  | Helmet detection             |
| Relay Module              | Controls bike ignition       |
| DC Motor / Ignition Model | Demonstration of bike engine |
| LED                       | Status indication            |
| Jumper Wires              | Circuit connections          |
| Breadboard                | Prototype setup              |
| Battery / Power Supply    | Power source                 |

---

# Working Principle

1. The sensor inside the helmet detects whether the rider is wearing the helmet.
2. The Arduino inside the helmet sends data through the HC-05 Bluetooth module.
3. The bike-side Arduino receives the signal.
4. If the helmet is worn:

   * Ignition system turns ON
   * LED indicator glows
   * Motor starts
5. If the helmet is removed:

   * Ignition system turns OFF
   * Motor stops automatically

---

# Circuit Connections

## Bluetooth Module Connections

| HC-05 Pin | Arduino Pin |
| --------- | ----------- |
| VCC       | 5V          |
| GND       | GND         |
| TX        | RX          |
| RX        | TX          |

## Motor and Relay Connections

| Component | Arduino Pin |
| --------- | ----------- |
| Relay IN  | Pin 7       |
| LED       | Pin 6       |

---


# Advantages

* Enhances rider safety
* Prevents riding without helmet
* Low-cost implementation
* Easy to use
* Can reduce accident severity
* Useful for smart transportation systems

---

# Disadvantages

* Requires power supply maintenance
* Bluetooth range limitation
* Sensor failure may affect operation
* Prototype suitable mainly for demonstration

---

# Future Enhancements

* GPS tracking integration
* Alcohol detection sensor
* Accident detection system
* GSM emergency alert system
* Mobile app monitoring
* Face recognition based rider authentication

---

# Applications

* Smart vehicle safety systems
* College mini projects
* IoT based transportation systems
* Rider safety applications
* Embedded systems learning

---

# System Architecture

```text
Helmet Sensor → Arduino → Bluetooth Module )))) Wireless )))) Bluetooth Receiver → Arduino → Relay → Bike Ignition
```

---

# Results

* Bike ignition successfully works only when helmet is worn.
* Wireless communication works properly.
* System automatically stops the motor when helmet is removed.
* LED indication shows system status.

---

# Conclusion

The Smart Helmet with Bike Ignition Control System is an effective safety solution that encourages riders to wear helmets before starting the bike. This project demonstrates the practical use of IoT, Arduino, and wireless communication in improving road safety.

---


# How to Run the Project

1. Upload the Arduino code to the microcontroller.
2. Connect the Bluetooth module and sensors.
3. Power the circuit.
4. Wear the helmet.
5. The bike ignition will turn ON automatically.
6. Remove the helmet to stop the ignition.

---

