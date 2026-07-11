uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.95;
	vec3 mq = mod(q, 1.92) - 0.96;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.96, 0.96, -3.0);
	vec3 rd = normalize(vec3(p, 1.41));
	rd.xy = rot2(time * -0.38) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.19 + time * 0.21, vec3(0.40, 0.57, 0.57), vec3(0.35, 0.40, 0.35), vec3(1.38, 1.29, 0.88), vec3(0.55, 0.85, 0.73)) * fog;
	col += vec3(0.33, 0.35, 0.89) * (it / 50.0) * 0.39;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
