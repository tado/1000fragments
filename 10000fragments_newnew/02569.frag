uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.95;
	vec2 g = mod(vec2(q.x, q.z), 2.56) - 1.28;
	float d = length(g) - (0.29 + 0.07 * sin(q.y * 1.14 + time * 3.40));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.28, 1.28, -3.0);
	vec3 rd = normalize(vec3(p, 1.35));
	rd.xy = rot2(time * -0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.24 + time * 0.33, vec3(0.59, 0.44, 0.52), vec3(0.40, 0.37, 0.31), vec3(0.93, 1.37, 1.02), vec3(0.89, 0.76, 0.22)) * fog;
	col += vec3(0.86, 0.36, 0.31) * (it / 64.0) * 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
