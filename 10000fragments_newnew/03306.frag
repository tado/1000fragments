uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.65) * q.xz;
	q.xy = rot2(time * 0.49) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.18, q.y);
	return length(w) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.21);
	vec3 rd = normalize(vec3(p, 1.11));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.37 + time * 0.04, vec3(0.43, 0.59, 0.58), vec3(0.39, 0.32, 0.46), vec3(1.20, 0.85, 0.89), vec3(0.77, 0.50, 0.18)) * fog;
	col += vec3(0.48, 0.95, 0.86) * (it / 63.0) * 0.78;
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
