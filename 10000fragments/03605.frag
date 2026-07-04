uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.11) * q.xz;
	q.xy = rot2(time * 1.18) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.38, q.y);
	return length(w) - 0.17;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.98);
	vec3 rd = normalize(vec3(p, 1.10));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.35 + time * 0.24, vec3(0.58, 0.50, 0.43), vec3(0.46, 0.34, 0.41), vec3(1.17, 0.86, 1.21), vec3(0.01, 0.88, 0.82)) * fog;
	col += vec3(0.30, 0.80, 0.76) * (it / 58.0) * 0.77;
	col = mod(col * 1.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
