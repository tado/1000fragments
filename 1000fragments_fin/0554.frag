uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	p = rot2(2.83) * p;
	vec2 q = p * 1.57 + vec2(1.58, 4.58);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 2; mi++){
		if(hash21(id * 0.731 + 0.02) > 0.67) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 0.65);
	float ftn = h;
	vec3 col = palette(((ftn * 2.0 - 1.0)) * 1.17 + (time * 0.89) * 0.02, vec3(0.29, 0.24, 0.43), vec3(0.41, 0.40, 0.47), vec3(0.96, 0.98, 0.96), vec3(0.58, 0.78, 0.11));
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.452, 0.467, bd);
	col = mix(col, vec3(0.73, 0.68, 0.75), edge * 0.85);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.07));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.013, 0.993, 0.956);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
