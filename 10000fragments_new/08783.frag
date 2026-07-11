uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	float g = dot(sin(q * 3.02), cos(q.zxy * 3.02));
	return (abs(g) - 0.52) / (3.02 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.88);
	vec3 rd = normalize(vec3(p, 1.21));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.29 + time * 0.16, vec3(0.55, 0.44, 0.59), vec3(0.33, 0.34, 0.40), vec3(0.74, 1.23, 1.07), vec3(0.83, 0.87, 0.15)) * fog;
	col += vec3(0.34, 0.63, 0.60) * (it / 60.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
