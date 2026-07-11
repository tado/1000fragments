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
	p *= 0.92;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.99;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.19, time * -0.33)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.18 * sin(p.x * 3.80 + time * 1.58) * sin(p.y * 3.34 - time * 1.57);
	float lv = (h + time * -0.09) * 14.6;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 0.49 + time * 0.09, vec3(0.54, 0.51, 0.56), vec3(0.42, 0.42, 0.50), vec3(1.03, 1.11, 0.84), vec3(0.53, 0.05, 0.21));
	col *= 1.0 - line * 0.53;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
