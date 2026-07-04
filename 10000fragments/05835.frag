uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.08) * q.xz;
	q.xy = rot2(time * 0.65) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.12, q.y);
	return length(w) - 0.19;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.54);
	vec3 rd = normalize(vec3(p, 1.09));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.29 + time * 0.05, vec3(0.46, 0.47, 0.42), vec3(0.45, 0.42, 0.41), vec3(1.29, 0.82, 0.80), vec3(0.16, 0.23, 0.42)) * fog;
	col += vec3(0.27, 0.99, 0.48) * (it / 59.0) * 0.43;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
