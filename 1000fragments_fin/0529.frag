uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.28;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	vec2 q = p * 3.13 + vec2(3.84, 3.16);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 7.43) > 0.50) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 3.56);
	float ftn = h;
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.52, 0.50, 0.48) + vec3(0.09, 0.12, 0.12);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.472, 0.487, bd);
	col = mix(col, vec3(0.60, 0.66, 0.68), edge * 0.81);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.015, 0.974, 0.999);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
