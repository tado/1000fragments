uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.38;
	float g = dot(sin(q * 2.83), cos(q.zxy * 2.83));
	return (abs(g) - 0.61) / (2.83 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.18);
	vec3 rd = normalize(vec3(p, 1.70));
	rd.xy = rot2(time * 0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.36 + time * 0.09, vec3(0.48, 0.54, 0.60), vec3(0.37, 0.46, 0.37), vec3(1.18, 0.76, 0.79), vec3(0.60, 0.37, 0.15)) * fog;
	col += vec3(0.88, 0.59, 0.22) * (it / 63.0) * 0.49;
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
