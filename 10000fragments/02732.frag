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


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.05;
	p = rot2(length(p) * 2.94 + time * 1.23) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.84;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.32, time * 0.35)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 3.00 + time * 0.54) * sin(p.y * 3.58 - time * 0.98);
	float lv = (h + time * 0.13) * 12.3;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.083, 0.020, 0.145) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 1.71 + time * 1.17)) * line;
	col = fract(col * 2.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
