uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.84) * q.xz;
	q.xy = rot2(time * 1.04) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.85, q.y);
	return length(w) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.17);
	vec3 rd = normalize(vec3(p, 1.52));
	rd.xy = rot2(time * -0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.39 + time * 0.02, vec3(0.47, 0.59, 0.55), vec3(0.43, 0.30, 0.40), vec3(1.07, 1.19, 1.18), vec3(0.95, 0.29, 0.19)) * fog;
	col += vec3(0.28, 0.63, 0.85) * (it / 60.0) * 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
