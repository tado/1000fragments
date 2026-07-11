uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.78;
	float g = dot(sin(q * 3.37), cos(q.zxy * 3.37));
	return (abs(g) - 0.59) / (3.37 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.51);
	vec3 rd = normalize(vec3(p, 1.22));
	rd.xy = rot2(time * 0.05) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.15 + time * 0.15, vec3(0.41, 0.45, 0.49), vec3(0.35, 0.38, 0.48), vec3(1.11, 0.99, 1.35), vec3(0.39, 0.73, 0.18)) * fog;
	col += vec3(0.61, 0.45, 0.92) * (it / 66.0) * 0.78;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
