uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.52;
	vec3 mq = mod(q, 2.58) - 1.29;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.29, 1.29, -3.0);
	vec3 rd = normalize(vec3(p, 1.18));
	rd.xy = rot2(time * 0.22) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.33 + time * 0.34, vec3(0.48, 0.50, 0.51), vec3(0.50, 0.40, 0.47), vec3(1.16, 0.87, 0.93), vec3(0.41, 0.82, 0.51)) * fog;
	col += vec3(0.43, 0.53, 0.46) * (it / 59.0) * 0.83;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
