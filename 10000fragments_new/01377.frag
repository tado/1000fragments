uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.48;
	float g = dot(sin(q * 2.46), cos(q.zxy * 2.46));
	return (abs(g) - 0.58) / (2.46 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.29);
	vec3 rd = normalize(vec3(p, 1.41));
	rd.xy = rot2(time * 0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.19 + time * 0.35, vec3(0.54, 0.57, 0.47), vec3(0.41, 0.47, 0.49), vec3(1.26, 1.27, 1.32), vec3(0.35, 0.78, 0.91)) * fog;
	col += vec3(0.89, 0.38, 0.76) * (it / 55.0) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
