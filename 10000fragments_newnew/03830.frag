uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.09;
	vec2 g = mod(vec2(q.x, q.z), 2.35) - 1.17;
	float d = length(g) - (0.18 + 0.07 * sin(q.y * 2.31 + time * 3.43));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * -0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.24 + time * 0.14, vec3(0.44, 0.50, 0.60), vec3(0.47, 0.41, 0.35), vec3(0.98, 1.06, 0.87), vec3(0.01, 0.31, 0.09)) * fog;
	col += vec3(0.97, 0.49, 0.37) * (it / 49.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
