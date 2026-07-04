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
	p *= 1.78;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.82;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.48, time * -0.48)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 8.2;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 8.2 + time * 0.16, vec3(0.45, 0.41, 0.59), vec3(0.48, 0.33, 0.34), vec3(0.85, 0.92, 1.08), vec3(0.65, 0.81, 0.97)) * (1.0 - line * 0.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
