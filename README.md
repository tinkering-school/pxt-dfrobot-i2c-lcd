# pxt-dfrobot-i2c-lcd

This is Micro:Bit extension for https://www.dfrobot.com/product-1737.html. The extension was ported from dfrobot code, https://github.com/bearwaterfall/DFRobot_LCD-master/tree/master. Not all functions are implemented.

## Blocks
### dfrobot lcd init
This block is must and initialze LCD and it's RGB. This block will also set RGB color to white

### set cursor (row, col)
This block will set cursor to row, col specified. There is no check on row and col limit, so use with care

### set rgb (red, green, blue)
This block will set color of rgb. red, green blue values ranges between 0 to 255

### write string(string)
This will write string on LCD. No checks are made, so use with care. Use **set cursor** if it is desired to write to specific location

### write char code(number)
This will write char which corresponds to the provided number. If it is desired to write number then convert to string and use **write string** 


## Example
https://drive.google.com/open?id=1GDGfS1uPAXRoSj4adSYYYB-LZ_VBQZX5

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

