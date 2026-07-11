uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 3.09 + (time * 0.79) * 0.65) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.87;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.79) * 0.45, (time * 0.79) * 0.30)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 7.8;
	float fc = fract(lv);
	float line = smoothstep(0.06, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 7.8 + (time * 0.79) * 0.10, vec3(0.25, 0.27, 0.29), vec3(0.31, 0.28, 0.25), vec3(0.82, 0.54, 0.80), vec3(0.62, 0.20, 0.46)) * (1.0 - line * 0.76);
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 2.98 + (time * 0.79) * 15.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 1.021, 0.928) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
