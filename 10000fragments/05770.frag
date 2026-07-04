uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.11;
	float g = dot(sin(q * 1.54), cos(q.zxy * 1.54));
	return (abs(g) - 0.55) / (1.54 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.98);
	vec3 rd = normalize(vec3(p, 1.43));
	rd.xy = rot2(time * -0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.28 + time * 0.33, vec3(0.54, 0.59, 0.48), vec3(0.40, 0.46, 0.35), vec3(1.39, 1.11, 0.86), vec3(0.47, 0.11, 0.62)) * fog;
	col += vec3(0.70, 0.28, 0.21) * (it / 68.0) * 0.75;
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
