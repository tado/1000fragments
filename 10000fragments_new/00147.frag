uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.64;
	float g = dot(sin(q * 2.93), cos(q.zxy * 2.93));
	return (abs(g) - 0.24) / (2.93 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.58);
	vec3 rd = normalize(vec3(p, 1.26));
	rd.xy = rot2(time * 0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.20 + time * 0.34, vec3(0.41, 0.49, 0.50), vec3(0.43, 0.42, 0.31), vec3(0.95, 0.96, 0.88), vec3(0.36, 0.30, 0.55)) * fog;
	col += vec3(0.85, 0.36, 0.90) * (it / 57.0) * 0.76;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
