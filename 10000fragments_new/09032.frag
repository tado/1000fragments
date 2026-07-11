uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.63) * q.xz;
	q.xy = rot2(time * 1.15) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.97, q.y);
	return length(w) - 0.24;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.90);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.29 + time * 0.34, vec3(0.49, 0.54, 0.54), vec3(0.44, 0.46, 0.38), vec3(0.91, 0.78, 0.87), vec3(0.03, 0.98, 0.06)) * fog;
	col += vec3(0.72, 0.57, 0.47) * (it / 63.0) * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
