uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.66 + vec2(6.49, 4.87);
	q += (time * 0.64) * vec2(0.08, 0.03);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 0.74) > 0.59) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 5.67);
	float rr = 0.25 + 0.08 * sin((time * 0.64) * 1.97 + h * 6.2831853);
	float ftn = (1.0 - smoothstep(rr - 0.08, rr, length(gv))) * (0.3 + 0.7 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.50 + (time * 0.64) * 0.10, vec3(0.47, 0.36, 0.46), vec3(0.36, 0.30, 0.35), vec3(1.03, 0.96, 1.03), vec3(0.77, 0.91, 0.15));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.472, 0.487, bd);
	col = mix(col, vec3(0.14, 0.12, 0.12), edge * 0.99);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.928, 0.991, 1.046);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
