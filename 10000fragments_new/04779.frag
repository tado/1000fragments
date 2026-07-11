uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.62) * q.xz;
	q.xy = rot2(time * 0.74) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.85, q.y);
	return length(w) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.61);
	vec3 rd = normalize(vec3(p, 1.69));
	rd.xy = rot2(time * -0.27) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.22 + time * 0.26, vec3(0.51, 0.57, 0.40), vec3(0.38, 0.41, 0.31), vec3(1.15, 0.96, 0.88), vec3(0.68, 0.24, 0.20)) * fog;
	col += vec3(0.44, 0.57, 0.56) * (it / 62.0) * 0.57;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
