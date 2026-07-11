uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.82;
	vec3 mq = mod(q, 1.68) - 0.84;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.84, 0.84, -3.0);
	vec3 rd = normalize(vec3(p, 1.14));
	rd.xy = rot2(time * -0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.34 + time * 0.33, vec3(0.56, 0.47, 0.52), vec3(0.36, 0.30, 0.33), vec3(1.02, 1.01, 1.28), vec3(0.89, 0.61, 0.82)) * fog;
	col += vec3(0.60, 0.57, 0.89) * (it / 53.0) * 0.83;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
