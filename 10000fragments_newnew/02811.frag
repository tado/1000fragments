uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.49;
	vec2 g = mod(vec2(q.x, q.z), 2.55) - 1.27;
	float d = length(g) - (0.20 + 0.12 * sin(q.y * 1.11 + time * 2.88));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.27, 1.27, -3.0);
	vec3 rd = normalize(vec3(p, 1.24));
	rd.xy = rot2(time * 0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.35 + time * 0.33, vec3(0.59, 0.43, 0.57), vec3(0.47, 0.36, 0.44), vec3(1.26, 0.98, 0.92), vec3(0.20, 0.32, 0.17)) * fog;
	col += vec3(0.36, 1.00, 0.22) * (it / 59.0) * 0.76;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
