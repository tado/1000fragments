uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.63) * q.xz;
	q.xy = rot2(time * 0.35) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.14, q.y);
	return length(w) - 0.28;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.05);
	vec3 rd = normalize(vec3(p, 1.03));
	rd.xy = rot2(time * -0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.11 + time * 0.06, vec3(0.41, 0.47, 0.56), vec3(0.47, 0.47, 0.43), vec3(0.83, 1.14, 1.03), vec3(0.57, 0.79, 0.94)) * fog;
	col += vec3(0.59, 0.64, 0.36) * (it / 62.0) * 0.32;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
