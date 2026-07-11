uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.67;
	float g = dot(sin(q * 3.43), cos(q.zxy * 3.43));
	return (abs(g) - 0.22) / (3.43 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.72);
	vec3 rd = normalize(vec3(p, 1.22));
	rd.xy = rot2(time * -0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.24 + time * 0.05, vec3(0.44, 0.40, 0.52), vec3(0.49, 0.46, 0.34), vec3(1.04, 0.85, 1.11), vec3(0.84, 0.19, 0.78)) * fog;
	col += vec3(0.89, 0.29, 0.28) * (it / 62.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
