uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.52) * q.xz;
	q.xy = rot2(time * 0.52) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.83, q.y);
	return length(w) - 0.20;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.66);
	vec3 rd = normalize(vec3(p, 0.91));
	rd.xy = rot2(time * -0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.13 + time * 0.18, vec3(0.44, 0.50, 0.48), vec3(0.44, 0.47, 0.44), vec3(1.12, 0.91, 1.36), vec3(0.58, 0.83, 0.14)) * fog;
	col += vec3(0.52, 0.95, 0.40) * (it / 68.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
