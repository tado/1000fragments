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
	p *= 2.10;
	p = rot2(length(p) * -1.89 + (time * 0.83) * 0.42) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.54;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.83) * -0.49, (time * 0.83) * 0.33)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.21 * sin(p.x * 3.10 + (time * 0.83) * 1.12) * sin(p.y * 1.34 - (time * 0.83) * 0.84);
	float lv = (h + (time * 0.83) * 0.11) * 10.2;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.048, 0.063, 0.141) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.40, 0.80) + lv * 1.35 + (time * 0.83) * 0.43)) * line;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.944, 1.010) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
