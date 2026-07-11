uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.32;
	float g = dot(sin(q * 2.50), cos(q.zxy * 2.50));
	return (abs(g) - 0.42) / (2.50 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.81);
	vec3 rd = normalize(vec3(p, 1.72));
	rd.xy = rot2(time * 0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.16 + time * 0.10, vec3(0.58, 0.55, 0.43), vec3(0.50, 0.32, 0.38), vec3(1.10, 1.22, 1.23), vec3(0.85, 0.47, 0.98)) * fog;
	col += vec3(0.41, 0.22, 0.34) * (it / 59.0) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
