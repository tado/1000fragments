uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.86) * q.xz;
	q.xy = rot2(time * 0.84) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.40, q.y);
	return length(w) - 0.24;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.98);
	vec3 rd = normalize(vec3(p, 0.94));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.21 + time * 0.13, vec3(0.51, 0.59, 0.49), vec3(0.31, 0.31, 0.45), vec3(0.73, 1.13, 1.19), vec3(0.45, 0.95, 0.29)) * fog;
	col += vec3(0.64, 0.34, 0.48) * (it / 72.0) * 0.87;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
