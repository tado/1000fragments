uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.03;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.54) * 0.42, (time * 0.54) * -0.21)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.12 * sin(p.x * 1.36 + (time * 0.54) * 1.45) * sin(p.y * 3.05 - (time * 0.54) * 1.39);
	float lv = (h) * 11.5;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 11.5 + (time * 0.54) * 0.02, vec3(0.38, 0.41, 0.34), vec3(0.21, 0.27, 0.22), vec3(0.79, 0.78, 0.62), vec3(0.07, 0.46, 0.73)) * (1.0 - line * 0.86);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.972, 1.011, 0.931) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
