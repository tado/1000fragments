uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.14;
	float g = dot(sin(q * 2.97), cos(q.zxy * 2.97));
	return (abs(g) - 0.75) / (2.97 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.02);
	vec3 rd = normalize(vec3(p, 1.58));
	rd.xy = rot2(time * 0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.33 + time * 0.03, vec3(0.57, 0.43, 0.46), vec3(0.34, 0.40, 0.40), vec3(0.83, 1.33, 1.17), vec3(0.13, 0.99, 0.94)) * fog;
	col += vec3(0.69, 0.95, 0.35) * (it / 71.0) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
