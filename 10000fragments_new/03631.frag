uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.22;
	vec3 mq = mod(q, 1.66) - 0.83;
	return length(mq) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.83, 0.83, -3.0);
	vec3 rd = normalize(vec3(p, 1.72));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.16 + time * 0.20, vec3(0.54, 0.48, 0.51), vec3(0.34, 0.49, 0.43), vec3(1.27, 0.71, 0.96), vec3(0.29, 0.09, 0.44)) * fog;
	col += vec3(0.86, 0.40, 0.40) * (it / 52.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
