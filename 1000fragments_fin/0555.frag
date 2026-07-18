uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.76;
	p += vec2(sin((time * 0.90) * 0.33), cos((time * 0.90) * 0.67)) * 0.22;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.48 + vec2(6.05, 5.61);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 3.16) > 0.71) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 4.88);
	float rr = 0.32 + 0.08 * sin((time * 0.90) * 0.84 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	float cc = clamp(0.5 + 0.5 * ((ftn * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.141, 0.039, 0.129), vec3(0.769, 0.345, 0.472), smoothstep(0.0, 0.59, cc)), vec3(1.000, 0.939, 0.822), smoothstep(0.59, 1.0, cc));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.421, 0.436, bd);
	col = mix(col, vec3(0.69, 0.62, 0.61), edge * 0.94);
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.008, 0.970, 0.958);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
