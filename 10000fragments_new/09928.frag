uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.77;
	float g = dot(sin(q * 3.05), cos(q.zxy * 3.05));
	return (abs(g) - 0.29) / (3.05 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.05);
	vec3 rd = normalize(vec3(p, 1.17));
	rd.xy = rot2(time * 0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.31 + time * 0.18, vec3(0.43, 0.50, 0.51), vec3(0.36, 0.36, 0.44), vec3(1.38, 0.81, 0.73), vec3(0.34, 0.45, 0.76)) * fog;
	col += vec3(0.68, 0.72, 0.53) * (it / 67.0) * 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
