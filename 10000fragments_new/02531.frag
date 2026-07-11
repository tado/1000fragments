uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.57) * q.xz;
	q.xy = rot2(time * 0.88) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.25, q.y);
	return length(w) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.61);
	vec3 rd = normalize(vec3(p, 0.96));
	rd.xy = rot2(time * 0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.22 + time * 0.27, vec3(0.55, 0.53, 0.57), vec3(0.44, 0.47, 0.42), vec3(1.29, 1.33, 1.06), vec3(0.46, 0.30, 0.56)) * fog;
	col += vec3(0.79, 0.99, 0.49) * (it / 68.0) * 0.47;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
