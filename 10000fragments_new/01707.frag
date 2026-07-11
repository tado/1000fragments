uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.98) * q.xz;
	q.xy = rot2(time * 0.62) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.07, q.y);
	return length(w) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.18);
	vec3 rd = normalize(vec3(p, 1.23));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.17 + time * 0.17, vec3(0.54, 0.59, 0.45), vec3(0.36, 0.35, 0.38), vec3(1.15, 0.78, 0.81), vec3(0.23, 0.61, 0.47)) * fog;
	col += vec3(0.39, 0.27, 0.88) * (it / 52.0) * 0.41;
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
