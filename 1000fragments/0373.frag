uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.59;
	vec2 g = mod(vec2(q.x, q.z), 2.06) - 1.03;
	float d = length(g) - (0.20 + 0.11 * sin(q.y * 3.39 + time * 2.52));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	rd.xy = rot2(time * 0.36) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.15 + time * 0.10, vec3(0.48, 0.55, 0.46), vec3(0.33, 0.40, 0.33), vec3(0.86, 1.33, 0.94), vec3(0.92, 0.97, 0.16)) * fog;
	col += vec3(0.20, 0.39, 0.91) * (it / 56.0) * 0.86;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
