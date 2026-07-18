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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.55;
	p.x = abs(p.x);
	p *= 2.16;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.34;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.59) * -0.45, (time * 0.59) * 0.47)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.10 * sin(p.x * 2.66 + (time * 0.59) * 1.46) * sin(p.y * 2.35 - (time * 0.59) * 1.04);
	float lv = (h + (time * 0.59) * -0.07) * 11.8;
	float fc = fract(lv);
	float line = smoothstep(0.06, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.070, 0.025, 0.041) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(1.667, 3.336, 5.005) + lv * 0.82 + (time * 0.59) * 0.71)) * line;
	col = clamp((col - 0.5) * 1.40 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.018, 0.969, 1.024);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
