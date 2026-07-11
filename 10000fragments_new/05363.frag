uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.69;
	float g = dot(sin(q * 2.90), cos(q.zxy * 2.90));
	return (abs(g) - 0.72) / (2.90 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.04);
	vec3 rd = normalize(vec3(p, 0.98));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.16 + time * 0.07, vec3(0.40, 0.44, 0.41), vec3(0.31, 0.35, 0.49), vec3(0.78, 0.79, 0.76), vec3(0.64, 0.78, 0.25)) * fog;
	col += vec3(0.90, 0.37, 0.62) * (it / 65.0) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
