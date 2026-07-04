uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.49) * q.xz;
	q.xy = rot2(time * 0.95) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.12, q.y);
	return length(w) - 0.19;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.58);
	vec3 rd = normalize(vec3(p, 1.35));
	rd.xy = rot2(time * 0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.18 + time * 0.33, vec3(0.41, 0.58, 0.40), vec3(0.38, 0.45, 0.47), vec3(1.24, 0.81, 1.37), vec3(0.71, 0.73, 0.04)) * fog;
	col += vec3(0.98, 0.50, 0.73) * (it / 52.0) * 0.66;
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 1.52 + time * 17.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
