uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.76;
	float g = dot(sin(q * 3.86), cos(q.zxy * 3.86));
	return (abs(g) - 0.64) / (3.86 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.28);
	vec3 rd = normalize(vec3(p, 1.78));
	rd.xy = rot2(time * -0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.36 + time * 0.26, vec3(0.43, 0.46, 0.53), vec3(0.48, 0.48, 0.42), vec3(1.13, 1.29, 0.71), vec3(0.83, 0.93, 0.52)) * fog;
	col += vec3(0.59, 0.77, 0.71) * (it / 58.0) * 0.95;
	col = fract(col * 1.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
