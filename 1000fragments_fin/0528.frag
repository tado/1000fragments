uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.35;
	p *= 2.72;
	p = rot2(0.95) * p;
	vec2 q = p * 3.11 + vec2(3.70, 3.23);
	q += (time * 0.84) * vec2(0.04, -0.05);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 2.25) > 0.76) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 8.07);
	float ftn = h;
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.74, 0.72, 0.74) + vec3(0.05, 0.00, 0.01);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.416, 0.431, bd);
	col = mix(col, vec3(0.08, 0.02, 0.05), edge * 0.92);
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.948, 0.973, 1.050);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
