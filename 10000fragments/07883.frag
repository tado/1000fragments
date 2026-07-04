uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.84;
	float g = dot(sin(q * 1.66), cos(q.zxy * 1.66));
	return (abs(g) - 0.37) / (1.66 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.35);
	vec3 rd = normalize(vec3(p, 1.34));
	rd.xy = rot2(time * -0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.19 + time * 0.27, vec3(0.52, 0.54, 0.51), vec3(0.45, 0.47, 0.33), vec3(1.04, 0.77, 1.03), vec3(0.10, 0.76, 0.27)) * fog;
	col += vec3(0.63, 0.67, 0.47) * (it / 57.0) * 0.64;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
