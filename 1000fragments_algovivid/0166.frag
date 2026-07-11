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
	p.x = abs(p.x);
	p += vec2(sin((time * 0.51) * 0.43), cos((time * 0.51) * 0.55)) * 0.23;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.76;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.51) * 0.24, (time * 0.51) * 0.23)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 14.7;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 14.7 + (time * 0.51) * 0.09, vec3(0.38, 0.34, 0.38), vec3(0.20, 0.20, 0.21), vec3(0.78, 0.45, 0.44), vec3(0.99, 0.59, 0.86)) * (1.0 - line * 0.83);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.51)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.958, 1.017) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
