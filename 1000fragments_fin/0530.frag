uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p.x += p.y * -0.38;
	vec2 q = p * 2.24 + vec2(3.43, 5.38);
	q += (time * 0.73) * vec2(0.06, 0.04);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 1.48) > 0.46) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.71);
	float rr = 0.28 + 0.08 * sin((time * 0.73) * 1.98 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.65, 0.64, 0.66) + vec3(0.10, 0.12, 0.05);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.432, 0.447, bd);
	col = mix(col, vec3(0.11, 0.10, 0.12), edge * 0.72);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.947, 0.972, 1.042);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
