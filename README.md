Javascript-Colorspace-Converter
===============================

Converts between HEX, RGB, HSB (= HSV) and HSL. There is no support (yet) for CMYK, LAB and XYZ. The library was intentionally created as a single file for the sake of simplicity. It will create the global object `ColorSpaceConverter`, which hosts all the conversion functions.

Usage
-----
Include the file in your JS project or HTML document (`<script src='colorspaceconverter.js'></script>`), and then simply convert any colorspace to another. Happy converting!
```javascript
var rgb = ColorSpaceConverter.hex_to_rgb('#ff00aa');
```

All colors are represented as an object with their 3 values as properties (except for HEX of course):
```javascript
var hex = '#000000';
var rgb = { r: '...', g: '...', b: '...' };
var hsb = { b: '...', s: '...', b: '...' };
var hsl = { h: '...', s: '...', l: '...' };
```

Example
-------
See the following example, going all the way from HEX => RGB => HSB => HSL and back. Note the library works without rounding numbers. Also note the capitalization of the HEX value on output (input was `#16388d` and output is `#16388D`).
```javascript
ColorSpaceConverter.hex_to_rgb('#16388d');
>> Object {r: 22, g: 56, b: 141}

ColorSpaceConverter.rgb_to_hsb({r: 22, g: 56, b: 141});
>> Object {h: 222.85714285714283, s: 84.39716312056737, b: 55.294117647058826}

ColorSpaceConverter.hsb_to_hsl({h: 222.85714285714283, s: 84.39716312056737, b: 55.294117647058826});
>> Object {h: 222.85714285714283, s: 73.00613496932515, l: 31.960784313725494}

ColorSpaceConverter.hsl_to_hex({h: 222.85714285714283, s: 73.00613496932515, l: 31.960784313725494});
>> "#16388D"
```
