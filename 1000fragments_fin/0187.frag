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
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 2.21;
	p = rot2(length(p) * -3.23 + (time * 0.63) * 1.42) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.83;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.63) * -0.36, (time * 0.63) * -0.18)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.15 * sin(p.x * 1.28 + (time * 0.63) * 1.27) * sin(p.y * 1.79 - (time * 0.63) * 1.20);
	float lv = (h) * 9.6;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.024, 0.064, 0.057), vec3(0.382, 0.482, 0.220), smoothstep(0.0, 0.59, cc)), vec3(0.998, 0.877, 0.571), smoothstep(0.59, 1.0, cc));
	col *= 1.0 - line * 0.82;
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.976, 0.999, 0.948);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
