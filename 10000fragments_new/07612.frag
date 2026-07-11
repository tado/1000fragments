uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.10;
	vec3 mq = mod(q, 2.32) - 1.16;
	return length(mq) - 0.49;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.25));
	rd.xy = rot2(time * 0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.16 + time * 0.02, vec3(0.41, 0.43, 0.59), vec3(0.39, 0.35, 0.43), vec3(1.11, 0.99, 0.71), vec3(0.26, 0.71, 0.11)) * fog;
	col += vec3(0.77, 0.37, 0.22) * (it / 51.0) * 0.71;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
