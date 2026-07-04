uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.23;
	float g = dot(sin(q * 3.98), cos(q.zxy * 3.98));
	return (abs(g) - 0.43) / (3.98 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.87);
	vec3 rd = normalize(vec3(p, 1.16));
	rd.xy = rot2(time * -0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.26 + time * 0.32, vec3(0.55, 0.48, 0.43), vec3(0.41, 0.31, 0.47), vec3(1.11, 1.03, 1.28), vec3(0.79, 0.82, 0.01)) * fog;
	col += vec3(0.91, 0.97, 0.92) * (it / 68.0) * 0.82;
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
