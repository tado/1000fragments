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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p = rot2(length(p) * -2.86 + (time * 0.77) * 1.11) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.57;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.77) * -0.23, (time * 0.77) * -0.12)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 8.9;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.049, 0.034, 0.041) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 1.02, 2.04) + lv * 1.81 + (time * 0.77) * 1.06)) * line;
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 2.56 + (time * 0.77) * 13.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.027, 1.001, 0.912) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
