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
	p *= 1.96;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.59;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.44, time * -0.24)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 3.95 + time * 1.27) * sin(p.y * 1.88 - time * 1.04);
	float lv = (h) * 17.7;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 17.7 + time * 0.05, vec3(0.45, 0.41, 0.57), vec3(0.38, 0.44, 0.31), vec3(0.91, 1.06, 1.37), vec3(0.76, 0.02, 0.45)) * (1.0 - line * 0.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
