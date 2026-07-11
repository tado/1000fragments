uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.91;
	float g = dot(sin(q * 3.07), cos(q.zxy * 3.07));
	return (abs(g) - 0.77) / (3.07 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.57);
	vec3 rd = normalize(vec3(p, 1.17));
	rd.xy = rot2(time * 0.22) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.33 + time * 0.28, vec3(0.43, 0.44, 0.60), vec3(0.40, 0.46, 0.46), vec3(0.73, 1.38, 0.88), vec3(0.24, 0.89, 0.11)) * fog;
	col += vec3(0.57, 0.21, 0.88) * (it / 59.0) * 0.71;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
