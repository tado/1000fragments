uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.96) * q.xz;
	q.xy = rot2(time * 0.95) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.15, q.y);
	return length(w) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.99);
	vec3 rd = normalize(vec3(p, 1.48));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.24 + time * 0.06, vec3(0.55, 0.45, 0.40), vec3(0.43, 0.46, 0.33), vec3(1.00, 0.70, 0.85), vec3(0.37, 0.41, 0.60)) * fog;
	col += vec3(0.88, 0.92, 0.67) * (it / 48.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
