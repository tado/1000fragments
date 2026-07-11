uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.67;
	vec3 mq = mod(q, 2.07) - 1.04;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.04, 1.04, -3.0);
	vec3 rd = normalize(vec3(p, 1.60));
	rd.xy = rot2(time * 0.27) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.14 + time * 0.06, vec3(0.49, 0.48, 0.41), vec3(0.44, 0.36, 0.42), vec3(0.74, 1.39, 0.82), vec3(0.86, 0.42, 0.76)) * fog;
	col += vec3(0.39, 0.74, 0.22) * (it / 59.0) * 0.31;
	col = mod(col * 1.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
