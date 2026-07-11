uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.13;
	vec3 mq = mod(q, 2.23) - 1.12;
	return length(mq) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 1.50));
	rd.xy = rot2(time * -0.05) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.14 + time * 0.12, vec3(0.46, 0.48, 0.56), vec3(0.43, 0.45, 0.44), vec3(1.26, 0.99, 0.73), vec3(0.54, 0.67, 0.99)) * fog;
	col += vec3(0.67, 0.49, 0.65) * (it / 59.0) * 0.48;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
