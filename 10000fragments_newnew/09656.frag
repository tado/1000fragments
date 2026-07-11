uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.47) * q.xz;
	q.xy = rot2(time * 0.93) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.23, q.y);
	return length(w) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.38);
	vec3 rd = normalize(vec3(p, 1.74));
	rd.xy = rot2(time * -0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.29 + time * 0.38, vec3(0.51, 0.55, 0.52), vec3(0.34, 0.43, 0.48), vec3(1.28, 1.10, 0.70), vec3(0.11, 0.57, 0.02)) * fog;
	col += vec3(0.31, 0.25, 0.62) * (it / 60.0) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
