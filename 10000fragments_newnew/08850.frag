uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.40;
	vec3 mq = mod(q, 2.08) - 1.04;
	return length(mq) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.04, 1.04, -3.0);
	vec3 rd = normalize(vec3(p, 1.74));
	rd.xy = rot2(time * -0.27) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.30 + time * 0.05, vec3(0.53, 0.46, 0.51), vec3(0.33, 0.46, 0.46), vec3(1.29, 1.20, 0.77), vec3(0.15, 0.45, 0.86)) * fog;
	col += vec3(0.53, 0.47, 0.66) * (it / 58.0) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
