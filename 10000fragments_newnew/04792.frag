uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	vec2 g = mod(vec2(q.x, q.z), 2.41) - 1.20;
	float d = length(g) - (0.29 + 0.06 * sin(q.y * 2.39 + time * 1.45));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.20, 1.20, -3.0);
	vec3 rd = normalize(vec3(p, 0.98));
	rd.xy = rot2(time * -0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.39 + time * 0.23, vec3(0.60, 0.55, 0.43), vec3(0.34, 0.32, 0.31), vec3(1.05, 0.71, 0.77), vec3(0.75, 0.26, 0.07)) * fog;
	col += vec3(0.78, 0.92, 0.59) * (it / 55.0) * 0.30;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
