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
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.17;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.38, time * 0.49)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.14 * sin(p.x * 2.28 + time * 0.67) * sin(p.y * 1.51 - time * 1.42);
	float lv = (h) * 9.3;
	float fc = fract(lv);
	float line = smoothstep(0.15, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 9.3 + time * 0.10, vec3(0.56, 0.53, 0.45), vec3(0.50, 0.41, 0.43), vec3(0.72, 1.12, 0.86), vec3(0.20, 0.20, 0.20)) * (1.0 - line * 0.69);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
