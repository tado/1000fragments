uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.94) * q.xz;
	q.xy = rot2(time * 0.73) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.90, q.y);
	return length(w) - 0.16;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.85);
	vec3 rd = normalize(vec3(p, 1.80));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.32 + time * 0.20, vec3(0.57, 0.44, 0.47), vec3(0.32, 0.41, 0.39), vec3(1.34, 1.32, 0.79), vec3(0.31, 0.42, 0.15)) * fog;
	col += vec3(0.29, 0.42, 0.45) * (it / 56.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
