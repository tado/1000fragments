uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.16;
	float g = dot(sin(q * 2.11), cos(q.zxy * 2.11));
	return (abs(g) - 0.73) / (2.11 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.24);
	vec3 rd = normalize(vec3(p, 1.55));
	rd.xy = rot2(time * -0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.10 + time * 0.11, vec3(0.58, 0.57, 0.46), vec3(0.47, 0.36, 0.38), vec3(1.03, 1.38, 1.24), vec3(0.02, 0.51, 0.75)) * fog;
	col += vec3(0.74, 0.31, 0.36) * (it / 52.0) * 0.71;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
