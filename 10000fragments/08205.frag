uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.97;
	vec2 g = mod(vec2(q.x, q.z), 1.97) - 0.99;
	float d = length(g) - (0.17 + 0.06 * sin(q.y * 2.56 + time * 3.47));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.99, 0.99, -3.0);
	vec3 rd = normalize(vec3(p, 1.07));
	rd.xy = rot2(time * 0.27) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.39 + time * 0.39, vec3(0.40, 0.52, 0.54), vec3(0.44, 0.36, 0.39), vec3(1.13, 0.94, 0.70), vec3(0.81, 0.72, 0.15)) * fog;
	col += vec3(0.61, 0.91, 0.67) * (it / 55.0) * 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
