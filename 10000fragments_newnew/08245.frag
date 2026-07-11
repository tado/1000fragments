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
	p *= 1.17;
	p = rot2(time * -1.41) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.59;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.30, time * 0.46)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + time * 0.24) * 6.3;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 6.3 + time * 0.05, vec3(0.41, 0.53, 0.43), vec3(0.40, 0.34, 0.30), vec3(1.03, 0.73, 1.15), vec3(0.33, 0.82, 0.67)) * (1.0 - line * 0.78);
	col = mod(col * 1.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
