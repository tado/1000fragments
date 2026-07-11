uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.56;
	float g = dot(sin(q * 2.50), cos(q.zxy * 2.50));
	return (abs(g) - 0.58) / (2.50 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.11);
	vec3 rd = normalize(vec3(p, 1.48));
	rd.xy = rot2(time * 0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.15 + time * 0.11, vec3(0.54, 0.59, 0.44), vec3(0.44, 0.44, 0.39), vec3(0.79, 0.99, 0.98), vec3(0.55, 0.09, 1.00)) * fog;
	col += vec3(0.30, 0.61, 0.73) * (it / 52.0) * 0.54;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
