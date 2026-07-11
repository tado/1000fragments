uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.07) * q.xz;
	q.xy = rot2(time * 0.49) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.95, q.y);
	return length(w) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.78);
	vec3 rd = normalize(vec3(p, 1.59));
	rd.xy = rot2(time * 0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.20 + time * 0.37, vec3(0.57, 0.57, 0.58), vec3(0.43, 0.42, 0.32), vec3(1.14, 1.35, 0.73), vec3(0.01, 0.42, 0.09)) * fog;
	col += vec3(0.82, 0.78, 0.43) * (it / 50.0) * 0.86;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
