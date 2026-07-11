uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.02;
	vec3 mq = mod(q, 1.81) - 0.91;
	return length(mq) - 0.48;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.91, 0.91, -3.0);
	vec3 rd = normalize(vec3(p, 1.24));
	rd.xy = rot2(time * -0.20) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.21 + time * 0.38, vec3(0.54, 0.50, 0.41), vec3(0.46, 0.43, 0.48), vec3(1.08, 0.83, 1.13), vec3(0.49, 0.29, 0.85)) * fog;
	col += vec3(0.36, 0.56, 0.52) * (it / 53.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
