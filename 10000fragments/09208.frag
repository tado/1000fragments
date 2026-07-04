uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.31;
	float g = dot(sin(q * 1.56), cos(q.zxy * 1.56));
	return (abs(g) - 0.55) / (1.56 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.38);
	vec3 rd = normalize(vec3(p, 1.69));
	rd.xy = rot2(time * -0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.26 + time * 0.17, vec3(0.46, 0.52, 0.45), vec3(0.34, 0.47, 0.48), vec3(0.97, 0.92, 0.96), vec3(0.85, 0.98, 0.64)) * fog;
	col += vec3(0.98, 0.77, 0.25) * (it / 63.0) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
