uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.88;
	vec2 g = mod(vec2(q.x, q.z), 1.81) - 0.91;
	float d = length(g) - (0.20 + 0.08 * sin(q.y * 3.03 + time * 1.47));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.91, 0.91, -3.0);
	vec3 rd = normalize(vec3(p, 1.23));
	rd.xy = rot2(time * -0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.29 + time * 0.07, vec3(0.46, 0.48, 0.58), vec3(0.37, 0.47, 0.32), vec3(0.89, 0.85, 1.10), vec3(0.83, 0.22, 0.76)) * fog;
	col += vec3(0.67, 0.78, 0.49) * (it / 71.0) * 0.87;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
