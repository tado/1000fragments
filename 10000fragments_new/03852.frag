uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	float g = dot(sin(q * 2.00), cos(q.zxy * 2.00));
	return (abs(g) - 0.25) / (2.00 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.67);
	vec3 rd = normalize(vec3(p, 1.55));
	rd.xy = rot2(time * -0.07) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.12 + time * 0.12, vec3(0.53, 0.46, 0.54), vec3(0.47, 0.37, 0.44), vec3(1.00, 0.89, 1.28), vec3(0.85, 0.67, 0.38)) * fog;
	col += vec3(0.68, 0.31, 0.78) * (it / 53.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
