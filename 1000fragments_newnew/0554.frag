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
	p *= 1.86;
	p = rot2(length(p) * -2.51 + (time * 0.66) * 1.40) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.41;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.66) * 0.16, (time * 0.66) * -0.44)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + (time * 0.66) * -0.14) * 9.3;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.065, 0.007, 0.008) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.96, 1.93) + lv * 1.96 + (time * 0.66) * 0.59)) * line;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.992, 1.010) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
