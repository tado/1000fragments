uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.48;
	vec2 g = mod(vec2(q.x, q.z), 2.58) - 1.29;
	float d = length(g) - (0.26 + 0.13 * sin(q.y * 3.21 + time * 1.22));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.29, 1.29, -3.0);
	vec3 rd = normalize(vec3(p, 1.15));
	rd.xy = rot2(time * 0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.17 + time * 0.38, vec3(0.56, 0.55, 0.51), vec3(0.48, 0.43, 0.43), vec3(1.11, 1.02, 1.29), vec3(0.02, 0.19, 0.03)) * fog;
	col += vec3(0.92, 0.29, 0.74) * (it / 71.0) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
