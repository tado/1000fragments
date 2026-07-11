uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.73) * q.xz;
	q.xy = rot2(time * 0.46) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.90, q.y);
	return length(w) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.92);
	vec3 rd = normalize(vec3(p, 1.29));
	rd.xy = rot2(time * -0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.23 + time * 0.09, vec3(0.45, 0.42, 0.59), vec3(0.45, 0.32, 0.43), vec3(1.23, 1.02, 0.77), vec3(0.61, 0.74, 0.45)) * fog;
	col += vec3(0.79, 0.33, 0.54) * (it / 66.0) * 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
