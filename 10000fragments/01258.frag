uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.11;
	vec2 g = mod(vec2(q.x, q.z), 1.89) - 0.95;
	float d = length(g) - (0.31 + 0.09 * sin(q.y * 2.42 + time * 3.50));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.95, 0.95, -3.0);
	vec3 rd = normalize(vec3(p, 1.10));
	rd.xy = rot2(time * 0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.34 + time * 0.01, vec3(0.47, 0.49, 0.42), vec3(0.31, 0.39, 0.50), vec3(1.29, 1.07, 0.93), vec3(0.79, 0.05, 0.51)) * fog;
	col += vec3(0.84, 0.50, 0.72) * (it / 54.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
