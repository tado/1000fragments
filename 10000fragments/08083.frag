uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.07;
	vec2 g = mod(vec2(q.x, q.z), 1.90) - 0.95;
	float d = length(g) - (0.30 + 0.10 * sin(q.y * 3.06 + time * 2.63));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.95, 0.95, -3.0);
	vec3 rd = normalize(vec3(p, 1.17));
	rd.xy = rot2(time * 0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.19 + time * 0.32, vec3(0.41, 0.44, 0.44), vec3(0.44, 0.38, 0.34), vec3(0.73, 0.94, 0.79), vec3(0.30, 0.49, 0.29)) * fog;
	col += vec3(0.71, 0.76, 0.64) * (it / 49.0) * 0.89;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
