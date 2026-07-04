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
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.12;
	p = rot2(length(p) * 3.33 + time * 1.02) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.29;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.42, time * 0.34)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 13.3;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 13.3 + time * 0.17, vec3(0.57, 0.46, 0.55), vec3(0.30, 0.44, 0.41), vec3(1.16, 0.99, 1.08), vec3(0.12, 0.87, 0.80)) * (1.0 - line * 0.69);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 1.90 + time * 14.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
