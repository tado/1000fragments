uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p.x += p.y * 0.77;
	p *= 1.20;
	vec2 q = p * 2.60 + vec2(0.97, 1.16);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 8.81) > 0.57) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.77);
	float ftn = h;
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.070, 0.052, 0.073), vec3(0.952, 0.505, 0.432), smoothstep(0.0, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.457, 0.472, bd);
	col = mix(col, vec3(0.16, 0.09, 0.09), edge * 0.98);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.967, 1.002, 0.958);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
