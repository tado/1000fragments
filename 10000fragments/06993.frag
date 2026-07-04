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
	p *= 0.89;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.20;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.47, time * -0.16)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.13 * sin(p.x * 2.14 + time * 1.66) * sin(p.y * 2.34 - time * 1.07);
	float lv = (h + time * 0.06) * 16.3;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 16.3 + time * 0.05, vec3(0.41, 0.55, 0.41), vec3(0.31, 0.47, 0.50), vec3(1.14, 1.08, 0.92), vec3(0.54, 0.16, 0.20)) * (1.0 - line * 0.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
