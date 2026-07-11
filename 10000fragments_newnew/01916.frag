uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.14;
	vec2 g = mod(vec2(q.x, q.z), 1.81) - 0.91;
	float d = length(g) - (0.28 + 0.05 * sin(q.y * 2.11 + time * 1.61));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.91, 0.91, -3.0);
	vec3 rd = normalize(vec3(p, 1.74));
	rd.xy = rot2(time * -0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.27 + time * 0.29, vec3(0.47, 0.53, 0.44), vec3(0.40, 0.50, 0.38), vec3(1.19, 1.33, 1.28), vec3(0.65, 0.88, 0.57)) * fog;
	col += vec3(0.72, 0.70, 0.50) * (it / 65.0) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
