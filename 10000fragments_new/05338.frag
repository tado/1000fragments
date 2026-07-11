uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.49;
	vec3 mq = mod(q, 1.83) - 0.92;
	return length(mq) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.92, 0.92, -3.0);
	vec3 rd = normalize(vec3(p, 1.52));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.36 + time * 0.18, vec3(0.48, 0.48, 0.60), vec3(0.31, 0.45, 0.49), vec3(1.22, 1.34, 1.01), vec3(0.40, 0.43, 0.84)) * fog;
	col += vec3(0.94, 0.54, 0.67) * (it / 59.0) * 0.40;
	col = mod(col * 1.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
