uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.79) * q.xz;
	q.xy = rot2(time * 1.01) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.92, q.y);
	return length(w) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.26);
	vec3 rd = normalize(vec3(p, 1.74));
	rd.xy = rot2(time * -0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.17 + time * 0.14, vec3(0.49, 0.41, 0.58), vec3(0.43, 0.39, 0.35), vec3(0.95, 1.18, 0.98), vec3(0.66, 0.69, 0.94)) * fog;
	col += vec3(0.67, 0.63, 0.28) * (it / 56.0) * 0.67;
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 1.63 + time * 9.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
