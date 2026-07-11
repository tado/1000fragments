uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.21;
	vec2 g = mod(vec2(q.x, q.z), 2.50) - 1.25;
	float d = length(g) - (0.27 + 0.07 * sin(q.y * 2.60 + time * 3.18));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 1.74));
	rd.xy = rot2(time * 0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.31 + time * 0.07, vec3(0.43, 0.52, 0.48), vec3(0.48, 0.37, 0.44), vec3(0.92, 0.75, 1.05), vec3(0.34, 0.45, 0.70)) * fog;
	col += vec3(0.73, 0.79, 0.49) * (it / 65.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
