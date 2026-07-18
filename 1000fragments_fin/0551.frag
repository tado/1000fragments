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
	p.x = abs(p.x);
	p *= 1.52;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	vec2 q = p * 2.27 + vec2(7.62, 2.74);
	q += (time * 0.72) * vec2(0.05, 0.09);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 4; mi++){
		if(hash21(id * 0.731 + 6.07) > 0.47) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.36);
	float ftn = clamp(0.5 + gv.x * 0.65 + gv.y * 1.43, 0.0, 1.0) * (0.35 + 0.65 * h);
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 0.85 + (time * 0.72) * 0.18, vec3(0.45, 0.37, 0.48), vec3(0.37, 0.29, 0.38), vec3(1.04, 0.97, 1.01), vec3(0.10, 0.18, 0.54));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.450, 0.465, bd);
	col = mix(col, vec3(0.55, 0.53, 0.57), edge * 0.84);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.033, 0.998, 0.936);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
