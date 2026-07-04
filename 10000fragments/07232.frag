uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.05;
	vec2 g = mod(vec2(q.x, q.z), 2.57) - 1.29;
	float d = length(g) - (0.30 + 0.14 * sin(q.y * 2.64 + time * 2.65));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.29, 1.29, -3.0);
	vec3 rd = normalize(vec3(p, 1.35));
	rd.xy = rot2(time * -0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.24 + time * 0.21, vec3(0.57, 0.42, 0.49), vec3(0.34, 0.38, 0.38), vec3(0.75, 1.30, 1.24), vec3(0.55, 0.39, 0.17)) * fog;
	col += vec3(0.86, 0.73, 0.87) * (it / 52.0) * 0.32;
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
