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
	p *= 0.92;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.86;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.62) * -0.24, (time * 0.62) * -0.35)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.30 * sin(p.x * 2.06 + (time * 0.62) * 0.64) * sin(p.y * 2.31 - (time * 0.62) * 1.69);
	float lv = (h + (time * 0.62) * 0.20) * 9.7;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 9.7 + (time * 0.62) * 0.24, vec3(0.24, 0.33, 0.33), vec3(0.09, 0.12, 0.15), vec3(0.64, 0.53, 0.74), vec3(0.37, 0.88, 0.43)) * (1.0 - line * 0.80);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.966, 1.003, 0.954) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
