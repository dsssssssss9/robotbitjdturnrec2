/**
 * Jacdac Motor Remote Control Receiver
 * 
 * This code uses a KittenBot RobotBit to control the speed & direction of a 3v DC motor connected to it 
 * 
 * Speed & direction are derived from values sent from a transmitter Micro:Bit
 * 
 * In this example the DC motor is connected to M!A on the RobotBit
 * 
 * The On-Board Neopixels are connected to PIN16
 */
// Set Variable "Number" to number received from Transmitter
radio.onReceivedNumber(function (receivedNumber) {
    Number2 = receivedNumber
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "a") {
        robotbit.MotorStopAll()
        basic.pause(100)
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        150,
        robotbit.Motors.M2A,
        0
        )
        basic.pause(2000)
    } else if (receivedString == "b") {
        robotbit.MotorStopAll()
        basic.pause(100)
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        0,
        robotbit.Motors.M2A,
        150
        )
        basic.pause(2000)
    }
})
// If received data = "Name" then set variable "Speed" to value of data 
// In this case the slider has value range  from 0 to 100 so this is mapped to 0 - 255 as that is whet the RobotBit Motor value range is  
radio.onReceivedValue(function (name, value) {
    if (name == "Speed") {
        Speed = Math.map(value, 0, 100, 0, 255)
    }
})
// on start do following...
// 
// set motor speed to 0
// stop motor
// 
// Set Radio Group
// 
// Initialise RobotBit On-Board Neopixels ( Pin16)
// 
// Display Tick on Micro:Bit & Flash Neopixels green to signify receiver is ready 
let Speed = 0
let Number2 = 0
Number2 = 0
robotbit.MotorStopAll()
let turn = 0
radio.setGroup(1)
radio.setTransmitPower(7)
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
led.setBrightness(115)
basic.showString("R")
strip.showColor(neopixel.colors(NeoPixelColors.Green))
strip.show()
basic.pause(200)
strip.clear()
strip.show()
// set motor to rotate in direction based on number ( 1 is clockwise , -1 is anti-clockwise ) at speed determined by value received from transmitter. In this case a Slide Potentiometer
basic.forever(function () {
    robotbit.MotorRun(robotbit.Motors.M1A, Speed * Number2)
    robotbit.MotorRun(robotbit.Motors.M2A, Speed * Number2)
    if (Speed * Number2 >= 0) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        strip.show()
        robotbit.GeekServo(robotbit.Servos.S1, -45)
    } else if (Speed * Number2 < 0) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        strip.show()
        robotbit.GeekServo(robotbit.Servos.S1, 45)
    }
})
