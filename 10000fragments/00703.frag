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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.29) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.99;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.42, time * -0.17)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.16 * sin(p.x * 2.50 + time * 0.63) * sin(p.y * 2.90 - time * 0.91);
	float lv = (h) * 14.2;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 14.2 + time * 0.05, vec3(0.57, 0.43, 0.50), vec3(0.35, 0.33, 0.48), vec3(0.83, 0.90, 0.81), vec3(0.77, 0.93, 0.73)) * (1.0 - line * 0.72);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
