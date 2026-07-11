uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.61;
	float g = dot(sin(q * 3.47), cos(q.zxy * 3.47));
	return (abs(g) - 0.68) / (3.47 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.21);
	vec3 rd = normalize(vec3(p, 1.78));
	rd.xy = rot2(time * -0.38) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.11 + time * 0.02, vec3(0.42, 0.43, 0.50), vec3(0.46, 0.36, 0.33), vec3(1.12, 1.22, 1.08), vec3(0.48, 0.21, 0.49)) * fog;
	col += vec3(0.64, 0.37, 0.45) * (it / 50.0) * 0.41;
	col = fract(col * 1.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
