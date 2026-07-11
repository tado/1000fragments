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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	p = rot2(length(p) * 2.76 + (time * 0.62) * 0.81) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.35;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.62) * 0.19, (time * 0.62) * -0.34)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.10 * sin(p.x * 1.04 + (time * 0.62) * 1.30) * sin(p.y * 3.41 - (time * 0.62) * 0.82);
	float lv = (h) * 9.9;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.026, 0.030, 0.015) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + lv * 1.07 + (time * 0.62) * 0.75)) * line;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.952, 1.006) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
