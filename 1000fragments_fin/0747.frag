uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.62) * 1.84;
	float g = dot(sin(q * 1.72), cos(q.zxy * 1.72));
	return (abs(g) - 0.38) / (1.72 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.22;
	p.y += sin(p.x * 2.34 + (time * 0.62) * 1.01) * 0.11;
	vec3 ro = vec3(0.0, 0.0, -2.99);
	vec3 rd = normalize(vec3(p, 1.36));
	rd.xy = rot2((time * 0.62) * 0.28) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.30 + (time * 0.62) * 0.05, vec3(0.61, 0.71, 0.80), vec3(0.26, 0.19, 0.16), vec3(1.02, 0.97, 0.99), vec3(0.49, 0.56, 0.63)) * fog;
	col += vec3(0.95, 0.88, 0.92) * (it / 54.0) * 0.45;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.991, 1.003, 1.002);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
