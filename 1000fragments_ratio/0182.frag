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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.76;
	p *= 1.42;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.14;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.75) * -0.37, (time * 0.75) * 0.39)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.22 * sin(p.x * 1.41 + (time * 0.75) * 1.58) * sin(p.y * 1.42 - (time * 0.75) * 0.70);
	float lv = (h) * 11.6;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 11.6 + (time * 0.75) * 0.10, vec3(0.39, 0.39, 0.45), vec3(0.14, 0.12, 0.13), vec3(0.68, 0.85, 0.57), vec3(0.37, 0.58, 0.40)) * (1.0 - line * 0.61);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.978, 0.996, 0.921) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
