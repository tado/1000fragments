uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.56) * q.xz;
	q.xy = rot2(time * 0.60) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.34, q.y);
	return length(w) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.19);
	vec3 rd = normalize(vec3(p, 1.74));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.21 + time * 0.17, vec3(0.59, 0.51, 0.50), vec3(0.31, 0.47, 0.45), vec3(0.89, 1.07, 1.12), vec3(0.14, 0.88, 0.00)) * fog;
	col += vec3(0.62, 0.31, 0.52) * (it / 50.0) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
