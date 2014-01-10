/*
	ColorSpaceConverter
	-------------------
	Converts any colorspace value to another:

	hex <-> rgb <-> hsb (=hsv) <-> hsl

	Any of the <space>_to_<space> functions will work.
*/


var ColorSpaceConverter = {

	'rgb_to_hex': function(rgb) {
		var toHex = function (N) {
			if (N==null) return "00";
			if (typeof N == 'number') N = Math.round(N);
			N=parseInt(N); if (N==0 || isNaN(N)) return "00";
			N=Math.max(0,N); N=Math.min(N,255); N=Math.round(N);
			return "0123456789ABCDEF".charAt((N-N%16)/16)
				+ "0123456789ABCDEF".charAt(N%16);
		}

		return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
	},

	'hex_to_rgb': function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.toLowerCase());
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	},

	'rgb_to_hsb': function (rgb) {
		var r = rgb.r, g = rgb.g, b = rgb.b;

		r /= 255; g /= 255; b /= 255; // Scale to unity.
		var minVal = Math.min(r, g, b),
		maxVal = Math.max(r, g, b),
		delta = maxVal - minVal,
		hsb = {h:0, s:0, b:maxVal},
		del_R, del_G, del_B;

		if( delta !== 0 )
		{
			hsb.s = delta / maxVal;
			del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
			del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
			del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

			if (r === maxVal) {hsb.h = del_B - del_G;}
			else if (g === maxVal) {hsb.h = (1 / 3) + del_R - del_B;}
			else if (b === maxVal) {hsb.h = (2 / 3) + del_G - del_R;}

			if (hsb.h < 0) {hsb.h += 1;}
			if (hsb.h > 1) {hsb.h -= 1;}
		}

		hsb.h = (hsb.h * 360);
		hsb.s = (hsb.s * 100);
		hsb.b = (hsb.b * 100);

		return hsb;
	},

	'hsb_to_rgb': function(hsb) {
	    var r, g, b, i, f, p, q, t;
        var h = hsb.h / 360, s = hsb.s / 100, v = hsb.b / 100;

	    i = Math.floor(h * 6);
	    f = h * 6 - i;
	    p = v * (1 - s);
	    q = v * (1 - f * s);
	    t = v * (1 - (1 - f) * s);
	    switch (i % 6) {
	        case 0: r = v, g = t, b = p; break;
	        case 1: r = q, g = v, b = p; break;
	        case 2: r = p, g = v, b = t; break;
	        case 3: r = p, g = q, b = v; break;
	        case 4: r = t, g = p, b = v; break;
	        case 5: r = v, g = p, b = q; break;
	    }
	    return {
	        r: (r * 255),
	        g: (g * 255),
	        b: (b * 255)
	    };
	},

	'hsb_to_hsl': function(hsb) {
		var s = hsb.s / 100;
		var b = hsb.b / 100;

		var ss, ll;

		ll = (2 - s) * b;
		ss = s * b;
		ss /= (ll <= 1) ? (ll) : 2 - (ll);
		ll /= 2;

		return { h: hsb.h, s: ss * 100, l: ll * 100};
	},

	'hsl_to_hsb': function(hsl) {
		var ss = hsl.s / 100;
		var ll = hsl.l / 100;

		var s, b;

		ll *= 2;
		ss *= (ll <= 1) ? ll : 2 - ll;
		b = (ll + ss) / 2;
		s = (2 * ss) / (ll + ss);

		return { h: hsl.h, s: s * 100, b: b * 100};
	},

	'hex_to_hsb': function(hex) {
		return ColorSpaceConverter.rgb_to_hsb(ColorSpaceConverter.hex_to_rgb(hex));
	},

	'hsb_to_hex': function(hsb) {
		return ColorSpaceConverter.rgb_to_hex(ColorSpaceConverter.hsb_to_rgb(hsb));
	},

	'rgb_to_hsl': function(rgb) {
		return ColorSpaceConverter.hsb_to_hsl(ColorSpaceConverter.rgb_to_hsb(rgb));
	},

	'hsl_to_rgb': function(hsl) {
		return ColorSpaceConverter.hsb_to_rgb(ColorSpaceConverter.hsl_to_hsb(hsl));
	},

	'hex_to_hsl': function(hex) {
		return ColorSpaceConverter.hsb_to_hsl(ColorSpaceConverter.rgb_to_hsb(ColorSpaceConverter.hex_to_rgb(hex)));
	},

	'hsl_to_hex': function(hsl) {
		return ColorSpaceConverter.rgb_to_hex(ColorSpaceConverter.hsb_to_rgb(ColorSpaceConverter.hsl_to_hsb(hsl)));
	}
}