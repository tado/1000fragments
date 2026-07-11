uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.18) * q.xz;
	q.xy = rot2(time * 1.10) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.10, q.y);
	return length(w) - 0.21;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.26);
	vec3 rd = normalize(vec3(p, 1.60));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.22 + time * 0.39, vec3(0.45, 0.48, 0.44), vec3(0.37, 0.49, 0.35), vec3(1.21, 1.11, 1.17), vec3(0.84, 0.59, 1.00)) * fog;
	col += vec3(0.47, 0.27, 0.76) * (it / 64.0) * 0.62;
	col = fract(col * 1.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
