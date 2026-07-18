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
	p.x += p.y * 0.32;
	p += vec2(sin((time * 0.82) * 0.70), cos((time * 0.82) * 0.48)) * 0.07;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.41;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.82) * -0.37, (time * 0.82) * 0.48)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 8.9;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.039, 0.042, 0.104), vec3(0.786, 0.699, 0.994), cc);
	col *= 1.0 - line * 0.66;
	col *= 0.83 + 0.12 * sin(gl_FragCoord.y * 1.70 + (time * 0.82) * 16.32);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.024, 0.973, 0.939);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
