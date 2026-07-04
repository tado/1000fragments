uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	float g = dot(sin(q * 2.73), cos(q.zxy * 2.73));
	return (abs(g) - 0.43) / (2.73 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.35);
	vec3 rd = normalize(vec3(p, 1.31));
	rd.xy = rot2(time * -0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.30 + time * 0.32, vec3(0.53, 0.43, 0.59), vec3(0.32, 0.48, 0.36), vec3(0.96, 0.86, 1.12), vec3(0.03, 0.25, 0.14)) * fog;
	col += vec3(0.47, 0.97, 0.67) * (it / 50.0) * 0.30;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
