uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.88) * q.xz;
	q.xy = rot2(time * 0.79) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.84, q.y);
	return length(w) - 0.20;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.76);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.11 + time * 0.25, vec3(0.58, 0.48, 0.42), vec3(0.43, 0.30, 0.33), vec3(1.24, 1.09, 1.18), vec3(0.35, 0.77, 0.40)) * fog;
	col += vec3(0.38, 0.22, 0.79) * (it / 50.0) * 0.99;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
