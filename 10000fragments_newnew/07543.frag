uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.86) * q.xz;
	q.xy = rot2(time * 0.98) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.17, q.y);
	return length(w) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.92);
	vec3 rd = normalize(vec3(p, 0.93));
	rd.xy = rot2(time * -0.20) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.39 + time * 0.39, vec3(0.57, 0.57, 0.58), vec3(0.35, 0.47, 0.47), vec3(0.94, 1.29, 0.83), vec3(0.62, 0.02, 0.41)) * fog;
	col += vec3(0.76, 0.66, 0.29) * (it / 61.0) * 0.84;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
