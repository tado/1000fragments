uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	float g = dot(sin(q * 1.62), cos(q.zxy * 1.62));
	return (abs(g) - 0.32) / (1.62 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.47);
	vec3 rd = normalize(vec3(p, 1.76));
	rd.xy = rot2(time * -0.31) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.34 + time * 0.02, vec3(0.55, 0.41, 0.60), vec3(0.37, 0.40, 0.31), vec3(1.38, 0.83, 0.98), vec3(0.40, 0.26, 0.56)) * fog;
	col += vec3(1.00, 0.90, 0.42) * (it / 67.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
