uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.63) * q.xz;
	q.xy = rot2(time * 0.76) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.29, q.y);
	return length(w) - 0.17;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.31);
	vec3 rd = normalize(vec3(p, 1.38));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.36 + time * 0.28, vec3(0.45, 0.49, 0.53), vec3(0.36, 0.46, 0.46), vec3(0.94, 0.91, 0.89), vec3(0.34, 0.34, 0.39)) * fog;
	col += vec3(0.66, 0.70, 0.40) * (it / 69.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
