uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.41) * q.xz;
	q.xy = rot2(time * 0.45) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.93, q.y);
	return length(w) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.39);
	vec3 rd = normalize(vec3(p, 1.08));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.27 + time * 0.25, vec3(0.55, 0.58, 0.58), vec3(0.44, 0.40, 0.37), vec3(0.94, 1.13, 1.30), vec3(0.28, 0.29, 0.90)) * fog;
	col += vec3(0.82, 0.99, 0.58) * (it / 56.0) * 0.49;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
