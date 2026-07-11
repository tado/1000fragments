uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.62;
	float g = dot(sin(q * 1.60), cos(q.zxy * 1.60));
	return (abs(g) - 0.62) / (1.60 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.94);
	vec3 rd = normalize(vec3(p, 1.03));
	rd.xy = rot2(time * -0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.20 + time * 0.28, vec3(0.41, 0.53, 0.47), vec3(0.37, 0.43, 0.49), vec3(1.09, 1.20, 0.81), vec3(0.22, 0.49, 0.08)) * fog;
	col += vec3(0.67, 0.89, 0.81) * (it / 57.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
