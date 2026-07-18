uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.72) * 0.89;
	vec2 g = mod(vec2(q.x, q.z), 2.45) - 1.22;
	float d = length(g) - (0.27 + 0.12 * sin(q.y * 2.54 + (time * 0.72) * 3.78));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.55));
	rd.xy = rot2((time * 0.72) * -0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.35 + (time * 0.72) * 0.15, vec3(0.77, 0.58, 0.62), vec3(0.24, 0.26, 0.21), vec3(1.02, 0.99, 1.01), vec3(0.92, 0.05, 0.06)) * fog;
	col += vec3(0.25, 0.91, 0.47) * (it / 62.0) * 0.73;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.997, 1.000, 1.010);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
