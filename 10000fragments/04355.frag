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
	p *= 2.74;
	p = rot2(length(p) * -1.36 + time * 1.10) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.12;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.24, time * 0.24)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 11.9;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 11.9 + time * 0.11, vec3(0.46, 0.55, 0.43), vec3(0.31, 0.45, 0.42), vec3(0.81, 0.94, 1.06), vec3(0.89, 0.63, 0.50)) * (1.0 - line * 0.84);
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
