uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.04) * q.xz;
	q.xy = rot2(time * 0.63) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.21, q.y);
	return length(w) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.79);
	vec3 rd = normalize(vec3(p, 1.06));
	rd.xy = rot2(time * 0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.28 + time * 0.19, vec3(0.52, 0.49, 0.58), vec3(0.45, 0.36, 0.31), vec3(1.20, 1.20, 0.76), vec3(0.58, 0.92, 0.42)) * fog;
	col += vec3(0.45, 0.61, 0.66) * (it / 57.0) * 0.58;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
