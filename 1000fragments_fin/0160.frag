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
	p.y = abs(p.y) - 0.55;
	p *= 2.71;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.38;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.64) * 0.27, (time * 0.64) * -0.33)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.25 * sin(p.x * 2.92 + (time * 0.64) * 0.50) * sin(p.y * 3.73 - (time * 0.64) * 1.66);
	float lv = (h + (time * 0.64) * 0.21) * 8.0;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.099, 0.086, 0.107) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.803, 2.360, 3.918) + lv * 1.68 + (time * 0.64) * 0.69)) * line;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.054, 1.012, 0.931);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
