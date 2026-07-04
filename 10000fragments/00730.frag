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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.84 + time * 1.41) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.59;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * 0.45, time * -0.24)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 3.88 + time * 0.63) * sin(p.y * 1.08 - time * 1.95);
	float lv = (h) * 9.3;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 1.49 + time * 0.36, vec3(0.53, 0.56, 0.53), vec3(0.49, 0.37, 0.32), vec3(1.22, 1.24, 0.83), vec3(0.16, 0.73, 0.00));
	col *= 1.0 - line * 0.76;
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
