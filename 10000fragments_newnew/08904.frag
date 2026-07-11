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
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.93;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * 0.30, time * 0.13)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.15 * sin(p.x * 3.33 + time * 1.26) * sin(p.y * 1.53 - time * 1.29);
	float lv = (h + time * -0.07) * 15.0;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 1.32 + time * 0.05, vec3(0.45, 0.56, 0.49), vec3(0.39, 0.38, 0.44), vec3(0.85, 0.81, 1.02), vec3(0.69, 0.33, 0.43));
	col *= 1.0 - line * 0.53;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
