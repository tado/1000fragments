uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.97;
	float g = dot(sin(q * 1.62), cos(q.zxy * 1.62));
	return (abs(g) - 0.55) / (1.62 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.60);
	vec3 rd = normalize(vec3(p, 1.47));
	rd.xy = rot2(time * 0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.32 + time * 0.26, vec3(0.59, 0.48, 0.60), vec3(0.47, 0.42, 0.31), vec3(1.32, 0.72, 1.40), vec3(0.30, 0.54, 0.42)) * fog;
	col += vec3(0.91, 0.39, 0.22) * (it / 64.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
