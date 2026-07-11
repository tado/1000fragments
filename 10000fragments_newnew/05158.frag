uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	vec3 mq = mod(q, 2.19) - 1.09;
	return length(mq) - 0.47;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.69));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.17 + time * 0.10, vec3(0.57, 0.46, 0.52), vec3(0.49, 0.32, 0.35), vec3(1.25, 1.00, 1.21), vec3(0.09, 0.78, 0.99)) * fog;
	col += vec3(0.68, 0.86, 0.96) * (it / 57.0) * 0.83;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
