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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.61;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * 0.19, time * -0.36)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.26 * sin(p.x * 3.48 + time * 1.95) * sin(p.y * 1.66 - time * 1.16);
	float lv = (h + time * -0.07) * 6.6;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 6.6 + time * 0.26, vec3(0.45, 0.48, 0.55), vec3(0.41, 0.47, 0.48), vec3(1.02, 1.36, 1.00), vec3(0.16, 0.98, 0.15)) * (1.0 - line * 0.84);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 2.58 + time * 13.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
