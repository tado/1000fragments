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
	p *= 1.15;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.98;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.40, time * -0.39)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.26 * sin(p.x * 3.83 + time * 1.86) * sin(p.y * 2.28 - time * 1.46);
	float lv = (h) * 13.3;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 13.3 + time * 0.25, vec3(0.55, 0.50, 0.40), vec3(0.45, 0.32, 0.47), vec3(1.16, 0.94, 1.33), vec3(0.14, 0.86, 0.26)) * (1.0 - line * 0.73);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
