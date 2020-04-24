//% weight=10 color=#57a421 block="dfrobot i2c lcd"
//% groups='["LCD"]'

namespace dfrobotI2cLcd {
    let lcd_addr = 0x3e
    let rgb_addr = 0x60

    // brief color define

    let WHITE = 0
    let RED = 1
    let GREEN = 2
    let BLUE = 3
    let ONLY = 3

    let REG_RED = 0x04        // pwm2
    let REG_GREEN = 0x03        // pwm1
    let REG_BLUE = 0x02        // pwm0
    let REG_ONLY = 0x02

    let REG_MODE1 = 0x00
    let REG_MODE2 = 0x01
    let REG_OUTPUT = 0x08


    // brief commands

    let LCD_CLEARDISPLAY = 0x01
    let LCD_RETURNHOME = 0x02
    let LCD_ENTRYMODESET = 0x04
    let LCD_DISPLAYCONTROL = 0x08
    let LCD_CURSORSHIFT = 0x10
    let LCD_FUNCTIONSET = 0x20
    let LCD_SETCGRAMADDR = 0x40
    let LCD_SETDDRAMADDR = 0x80

    // brief flags for display entry mode

    let LCD_ENTRYRIGHT = 0x00
    let LCD_ENTRYLEFT = 0x02
    let LCD_ENTRYSHIFTINCREMENT = 0x01
    let LCD_ENTRYSHIFTDECREMENT = 0x00

    // brief flags for display on/off control

    let LCD_DISPLAYON = 0x04
    let LCD_DISPLAYOFF = 0x00
    let LCD_CURSORON = 0x02
    let LCD_CURSOROFF = 0x00
    let LCD_BLINKON = 0x01
    let LCD_BLINKOFF = 0x00

    // brief flags for display/cursor shift

    let LCD_DISPLAYMOVE = 0x08
    let LCD_CURSORMOVE = 0x00
    let LCD_MOVERIGHT = 0x04
    let LCD_MOVELEFT = 0x00

    // @brief flags for function set

    let LCD_8BITMODE = 0x10
    let LCD_4BITMODE = 0x00
    let LCD_2LINE = 0x08
    let LCD_1LINE = 0x00
    let LCD_5x10DOTS = 0x04
    let LCD_5x8DOTS = 0x00

    let showcontrol = LCD_DISPLAYON | LCD_CURSOROFF | LCD_BLINKOFF
    let showmode = LCD_ENTRYLEFT | LCD_ENTRYSHIFTDECREMENT

    let showfunction = LCD_4BITMODE | LCD_1LINE | LCD_5x8DOTS | LCD_2LINE

    function command(value: number): void {

        let buf = pins.createBuffer(2)
        buf[0] = 0x80
        buf[1] = value
        pins.i2cWriteBuffer(lcd_addr, buf, false)

    }

    function setReg(addr: number, value: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = addr
        buf[1] = value
        pins.i2cWriteBuffer(rgb_addr, buf, false)
    }

    //% block="dfrobot lcd init"
    //% weight=100
    export function init(): void {
        basic.pause(40)
        command(LCD_FUNCTIONSET | showfunction)
        basic.pause(5)
        command(LCD_FUNCTIONSET | showfunction)
        basic.pause(5)
        command(LCD_FUNCTIONSET | showfunction)

        display()

        clear()

        command(LCD_ENTRYMODESET | showmode)

        setReg(REG_MODE1, 0)

        setReg(REG_OUTPUT, 0xFF)

        setReg(REG_MODE2, 0x20)

        setRgb(255, 255, 255)

    }

    function display(): void {
        showcontrol |= LCD_DISPLAYON
        command(LCD_DISPLAYCONTROL | showcontrol)
    }

    function clear(): void {
        command(LCD_CLEARDISPLAY)
        basic.pause(2000)
    }

    //% block = "set rgb %red|red %green|green %blue|blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function setRgb(red: number, green: number, blue: number): void {
        setReg(REG_RED, red)
        setReg(REG_GREEN, green)
        setReg(REG_BLUE, blue)
    }

    //% block = "set cursor %row|row %col|col"
    //% row.min=0 row.max=1
    //% col.min=0 col.max=15
    export function setCursor(row: number, col: number): void {
        let data = (row == 0 ? col | 0x80 : col | 0xc0)
        let buf = pins.createBuffer(2)
        buf[0] = 0x80
        buf[1] = data
        pins.i2cWriteBuffer(lcd_addr, buf, false)
    }

    export function scrollDisplayLeft(): void {
        command(LCD_CURSORSHIFT | LCD_DISPLAYMOVE | LCD_MOVELEFT)
    }

    export function scrollDisplayRight(): void {
        command(LCD_CURSORSHIFT | LCD_DISPLAYMOVE | LCD_MOVERIGHT)
    }

    //% block="write string %data"
    export function writeString(data: string): void {
        let buf = pins.createBuffer(1+data.length)
        buf[0] = 0x40
        for (let i = 0; i < data.length; i++) {
            buf[i+1] = data.charCodeAt(i)
        }
        pins.i2cWriteBuffer(lcd_addr, buf, false)
    }
    
    //% block="write char code %data"
    export function writeCharCode(data: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = 0x40
        buf[1] = data
        pins.i2cWriteBuffer(lcd_addr, buf, false)
    }

} 