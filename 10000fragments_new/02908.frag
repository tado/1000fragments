uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.43;
	float g = dot(sin(q * 3.15), cos(q.zxy * 3.15));
	return (abs(g) - 0.29) / (3.15 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.46);
	vec3 rd = normalize(vec3(p, 1.76));
	rd.xy = rot2(time * -0.36) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.33 + time * 0.12, vec3(0.57, 0.57, 0.59), vec3(0.44, 0.38, 0.44), vec3(0.72, 0.78, 1.24), vec3(0.08, 0.48, 0.91)) * fog;
	col += vec3(0.94, 0.64, 0.67) * (it / 68.0) * 0.73;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
