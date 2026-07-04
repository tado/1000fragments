uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.86;
	vec3 mq = mod(q, 2.06) - 1.03;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.15));
	rd.xy = rot2(time * -0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.14 + time * 0.00, vec3(0.49, 0.58, 0.43), vec3(0.37, 0.49, 0.44), vec3(0.94, 1.40, 1.29), vec3(0.95, 0.59, 0.28)) * fog;
	col += vec3(0.26, 0.69, 0.38) * (it / 54.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
