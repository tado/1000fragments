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
	p *= 2.22;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.70;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.22, time * 0.29)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 3.72 + time * 1.72) * sin(p.y * 1.46 - time * 1.71);
	float lv = (h + time * 0.11) * 7.1;
	float fc = fract(lv);
	float line = smoothstep(0.10, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 7.1 + time * 0.05, vec3(0.44, 0.45, 0.52), vec3(0.46, 0.48, 0.30), vec3(1.04, 0.90, 0.78), vec3(0.53, 0.22, 0.29)) * (1.0 - line * 0.80);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
