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
	p *= 0.91;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.52;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.36, time * 0.50)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 11.0;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 11.0 + time * 0.26, vec3(0.43, 0.50, 0.41), vec3(0.39, 0.42, 0.46), vec3(0.85, 0.89, 1.17), vec3(0.83, 0.62, 0.39)) * (1.0 - line * 0.81);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.26 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
