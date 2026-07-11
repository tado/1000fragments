uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.34;
	float g = dot(sin(q * 3.18), cos(q.zxy * 3.18));
	return (abs(g) - 0.72) / (3.18 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.23);
	vec3 rd = normalize(vec3(p, 1.71));
	rd.xy = rot2(time * 0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.27 + time * 0.39, vec3(0.43, 0.54, 0.50), vec3(0.39, 0.36, 0.39), vec3(1.17, 1.15, 1.15), vec3(0.05, 0.27, 0.31)) * fog;
	col += vec3(0.23, 0.62, 0.29) * (it / 51.0) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
