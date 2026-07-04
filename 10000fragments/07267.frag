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
	p *= 1.21;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.42;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.39, time * 0.27)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.19 * sin(p.x * 3.84 + time * 0.87) * sin(p.y * 2.77 - time * 1.21);
	float lv = (h) * 9.0;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 0.62 + time * 0.01, vec3(0.49, 0.58, 0.44), vec3(0.43, 0.41, 0.45), vec3(1.30, 1.21, 1.04), vec3(0.25, 0.47, 0.42));
	col *= 1.0 - line * 0.64;
	col *= 0.84 + 0.19 * sin(gl_FragCoord.y * 1.17 + time * 15.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
