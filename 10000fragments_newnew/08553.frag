uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.73) * q.xz;
	q.xy = rot2(time * 1.08) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.25, q.y);
	return length(w) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 1.66));
	rd.xy = rot2(time * -0.36) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.32 + time * 0.35, vec3(0.43, 0.54, 0.41), vec3(0.35, 0.37, 0.41), vec3(1.28, 1.05, 0.92), vec3(0.61, 0.94, 0.38)) * fog;
	col += vec3(0.29, 0.71, 0.90) * (it / 49.0) * 0.46;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
