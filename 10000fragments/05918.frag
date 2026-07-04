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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.24;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.30, time * 0.14)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.17 * sin(p.x * 2.17 + time * 0.95) * sin(p.y * 1.45 - time * 0.84);
	float lv = (h + time * 0.13) * 9.7;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 1.01 + time * 0.11, vec3(0.56, 0.52, 0.51), vec3(0.34, 0.50, 0.37), vec3(0.73, 0.98, 0.93), vec3(0.63, 0.70, 0.64));
	col *= 1.0 - line * 0.60;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
