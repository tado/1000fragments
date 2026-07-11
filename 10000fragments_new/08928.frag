uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	vec3 mq = mod(q, 1.71) - 0.86;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.86, 0.86, -3.0);
	vec3 rd = normalize(vec3(p, 1.21));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.34 + time * 0.33, vec3(0.43, 0.54, 0.50), vec3(0.40, 0.33, 0.47), vec3(0.71, 0.77, 1.05), vec3(0.24, 0.27, 0.82)) * fog;
	col += vec3(0.21, 0.30, 0.59) * (it / 56.0) * 0.59;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
