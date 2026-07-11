uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.64;
	float g = dot(sin(q * 2.41), cos(q.zxy * 2.41));
	return (abs(g) - 0.55) / (2.41 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.59);
	vec3 rd = normalize(vec3(p, 1.62));
	rd.xy = rot2(time * 0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.36 + time * 0.27, vec3(0.48, 0.57, 0.44), vec3(0.31, 0.38, 0.41), vec3(0.97, 1.00, 1.10), vec3(0.57, 0.13, 0.61)) * fog;
	col += vec3(0.66, 0.49, 0.91) * (it / 56.0) * 0.71;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
