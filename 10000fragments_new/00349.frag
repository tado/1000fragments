uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.78;
	float g = dot(sin(q * 1.61), cos(q.zxy * 1.61));
	return (abs(g) - 0.30) / (1.61 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.33);
	vec3 rd = normalize(vec3(p, 1.27));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.27 + time * 0.24, vec3(0.56, 0.44, 0.50), vec3(0.36, 0.31, 0.38), vec3(1.12, 1.04, 0.70), vec3(0.42, 0.36, 0.34)) * fog;
	col += vec3(0.86, 0.82, 0.37) * (it / 59.0) * 0.93;
	col = mod(col * 2.07, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
