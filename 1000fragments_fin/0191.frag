uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.64;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.80) * 0.24, (time * 0.80) * 0.17)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.26 * sin(p.x * 1.65 + (time * 0.80) * 1.56) * sin(p.y * 3.75 - (time * 0.80) * 1.51);
	float lv = (h + (time * 0.80) * -0.14) * 12.6;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.019, 0.113, 0.113), vec3(0.181, 0.599, 0.465), smoothstep(0.0, 0.40, cc)), vec3(0.970, 0.941, 0.880), smoothstep(0.40, 1.0, cc));
	col *= 1.0 - line * 0.55;
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 1.72 + (time * 0.80) * 10.16);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.945, 0.972, 1.054);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
