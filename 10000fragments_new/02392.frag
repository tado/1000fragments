uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.17) * q.xz;
	q.xy = rot2(time * 1.01) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.98, q.y);
	return length(w) - 0.19;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.02);
	vec3 rd = normalize(vec3(p, 1.20));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.28 + time * 0.20, vec3(0.40, 0.42, 0.40), vec3(0.39, 0.43, 0.46), vec3(0.76, 1.27, 0.75), vec3(0.20, 0.52, 0.95)) * fog;
	col += vec3(0.47, 0.74, 0.62) * (it / 64.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
