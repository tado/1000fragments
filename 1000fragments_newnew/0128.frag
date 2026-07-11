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
	p = rot2(length(p) * -1.04 + (time * 0.58) * 0.48) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.46;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.58) * 0.18, (time * 0.58) * 0.49)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.25 * sin(p.x * 3.40 + (time * 0.58) * 1.37) * sin(p.y * 1.23 - (time * 0.58) * 1.70);
	float lv = (h) * 9.5;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.084, 0.097, 0.137) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.98, 1.97) + lv * 0.53 + (time * 0.58) * 0.77)) * line;
	col *= 0.88 + 0.14 * sin(gl_FragCoord.y * 1.39 + (time * 0.58) * 10.05);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.998, 0.988, 1.013) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
