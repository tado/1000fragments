uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.81;
	float g = dot(sin(q * 2.57), cos(q.zxy * 2.57));
	return (abs(g) - 0.29) / (2.57 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.75);
	vec3 rd = normalize(vec3(p, 1.34));
	rd.xy = rot2(time * 0.26) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.26 + time * 0.35, vec3(0.51, 0.41, 0.47), vec3(0.31, 0.47, 0.45), vec3(0.82, 1.37, 1.01), vec3(0.73, 0.48, 0.85)) * fog;
	col += vec3(0.49, 0.80, 0.86) * (it / 58.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
