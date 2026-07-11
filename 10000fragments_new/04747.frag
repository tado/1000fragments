uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.80;
	float g = dot(sin(q * 1.86), cos(q.zxy * 1.86));
	return (abs(g) - 0.39) / (1.86 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.65);
	vec3 rd = normalize(vec3(p, 1.79));
	rd.xy = rot2(time * -0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.26 + time * 0.31, vec3(0.51, 0.47, 0.53), vec3(0.32, 0.42, 0.45), vec3(1.38, 1.37, 1.19), vec3(0.69, 0.96, 0.45)) * fog;
	col += vec3(0.82, 0.38, 0.29) * (it / 66.0) * 1.00;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
