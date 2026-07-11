uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.66;
	vec3 mq = mod(q, 2.19) - 1.09;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.17));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.16 + time * 0.07, vec3(0.52, 0.45, 0.53), vec3(0.41, 0.45, 0.36), vec3(1.33, 1.17, 0.73), vec3(0.68, 0.16, 0.28)) * fog;
	col += vec3(0.79, 0.66, 0.28) * (it / 64.0) * 0.53;
	col = mod(col * 1.99, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
