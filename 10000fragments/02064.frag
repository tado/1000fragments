uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.00;
	vec2 g = mod(vec2(q.x, q.z), 2.01) - 1.01;
	float d = length(g) - (0.27 + 0.06 * sin(q.y * 2.05 + time * 3.09));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.01));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.25 + time * 0.17, vec3(0.58, 0.59, 0.41), vec3(0.41, 0.38, 0.48), vec3(1.38, 1.27, 1.36), vec3(0.01, 0.06, 0.09)) * fog;
	col += vec3(0.69, 0.93, 0.54) * (it / 63.0) * 0.65;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
