uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.97;
	vec3 mq = mod(q, 2.48) - 1.24;
	return length(mq) - 0.48;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.24, 1.24, -3.0);
	vec3 rd = normalize(vec3(p, 1.79));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.11 + time * 0.14, vec3(0.42, 0.56, 0.47), vec3(0.49, 0.50, 0.31), vec3(1.17, 0.76, 0.97), vec3(0.64, 0.78, 0.75)) * fog;
	col += vec3(0.56, 0.29, 0.71) * (it / 50.0) * 0.35;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
