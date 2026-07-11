uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
	p *= 1.08;
	p = rot2(length(p) * -3.83 + time * 0.94) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.71;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.40, time * 0.11)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 15.3;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 15.3 + time * 0.07, vec3(0.45, 0.48, 0.45), vec3(0.34, 0.40, 0.43), vec3(1.18, 1.06, 0.81), vec3(0.29, 0.84, 0.53)) * (1.0 - line * 0.80);
	col *= 0.80 + 0.15 * sin(gl_FragCoord.y * 2.43 + time * 7.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
