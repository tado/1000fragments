uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.51) * q.xz;
	q.xy = rot2(time * 1.00) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.00, q.y);
	return length(w) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.88);
	vec3 rd = normalize(vec3(p, 1.17));
	rd.xy = rot2(time * 0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.23 + time * 0.19, vec3(0.53, 0.43, 0.51), vec3(0.35, 0.31, 0.34), vec3(1.03, 1.34, 0.94), vec3(0.04, 0.85, 0.81)) * fog;
	col += vec3(0.33, 0.92, 0.65) * (it / 61.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
