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
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.56) * 1.14), cos((time * 0.56) * 1.12)) * 0.25;
	p.y = abs(p.y) - 0.30;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.95;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.56) * 0.35, (time * 0.56) * -0.44)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.26 * sin(p.x * 3.60 + (time * 0.56) * 0.81) * sin(p.y * 3.71 - (time * 0.56) * 1.70);
	float lv = (h) * 10.4;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 10.4 + (time * 0.56) * 0.15, vec3(0.40, 0.45, 0.33), vec3(0.30, 0.29, 0.24), vec3(0.51, 0.83, 0.70), vec3(0.36, 0.38, 0.12)) * (1.0 - line * 0.61);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 0.956, 1.008) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
