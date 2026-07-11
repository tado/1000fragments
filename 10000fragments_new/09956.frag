uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.67) * q.xz;
	q.xy = rot2(time * 0.77) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.02, q.y);
	return length(w) - 0.17;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.57));
	rd.xy = rot2(time * 0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.38 + time * 0.22, vec3(0.45, 0.43, 0.57), vec3(0.45, 0.36, 0.46), vec3(1.15, 0.93, 0.80), vec3(0.73, 0.28, 0.20)) * fog;
	col += vec3(0.92, 0.42, 0.25) * (it / 65.0) * 0.63;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
