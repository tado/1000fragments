uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.97) * q.xz;
	q.xy = rot2(time * 0.55) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.85, q.y);
	return length(w) - 0.23;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.93);
	vec3 rd = normalize(vec3(p, 1.59));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.34 + time * 0.11, vec3(0.42, 0.46, 0.58), vec3(0.31, 0.30, 0.42), vec3(1.15, 0.92, 1.14), vec3(0.16, 0.59, 0.37)) * fog;
	col += vec3(0.74, 0.29, 0.66) * (it / 71.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
