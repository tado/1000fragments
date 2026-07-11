uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.01;
	float g = dot(sin(q * 1.58), cos(q.zxy * 1.58));
	return (abs(g) - 0.76) / (1.58 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.69);
	vec3 rd = normalize(vec3(p, 1.50));
	rd.xy = rot2(time * -0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.23 + time * 0.08, vec3(0.54, 0.51, 0.51), vec3(0.47, 0.40, 0.48), vec3(0.75, 0.82, 0.94), vec3(0.71, 0.45, 0.56)) * fog;
	col += vec3(0.92, 0.26, 0.94) * (it / 60.0) * 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
