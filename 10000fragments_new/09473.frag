uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.15;
	float g = dot(sin(q * 3.47), cos(q.zxy * 3.47));
	return (abs(g) - 0.50) / (3.47 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.14);
	vec3 rd = normalize(vec3(p, 1.01));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.23 + time * 0.40, vec3(0.43, 0.51, 0.51), vec3(0.45, 0.43, 0.44), vec3(0.82, 1.27, 1.14), vec3(0.35, 0.51, 0.77)) * fog;
	col += vec3(0.26, 0.65, 0.58) * (it / 57.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
