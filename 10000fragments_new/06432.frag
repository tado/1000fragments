uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.85) * q.xz;
	q.xy = rot2(time * 0.51) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.91, q.y);
	return length(w) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.70);
	vec3 rd = normalize(vec3(p, 0.94));
	rd.xy = rot2(time * -0.22) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.37 + time * 0.33, vec3(0.54, 0.60, 0.52), vec3(0.36, 0.31, 0.46), vec3(0.87, 0.78, 0.79), vec3(0.23, 0.94, 0.04)) * fog;
	col += vec3(0.75, 0.39, 0.40) * (it / 64.0) * 0.58;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
