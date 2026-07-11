uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.05) * q.xz;
	q.xy = rot2(time * 0.66) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.85, q.y);
	return length(w) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.46);
	vec3 rd = normalize(vec3(p, 1.54));
	rd.xy = rot2(time * -0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.37 + time * 0.39, vec3(0.48, 0.52, 0.58), vec3(0.43, 0.32, 0.33), vec3(1.17, 0.90, 1.26), vec3(0.70, 0.99, 0.25)) * fog;
	col += vec3(0.69, 0.58, 0.31) * (it / 66.0) * 0.97;
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
