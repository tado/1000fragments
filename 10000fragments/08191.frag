uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.75) * q.xz;
	q.xy = rot2(time * 0.70) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.27, q.y);
	return length(w) - 0.17;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.35);
	vec3 rd = normalize(vec3(p, 1.74));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.32 + time * 0.37, vec3(0.41, 0.51, 0.45), vec3(0.41, 0.37, 0.36), vec3(1.09, 0.80, 0.97), vec3(0.63, 0.90, 0.97)) * fog;
	col += vec3(0.56, 0.43, 0.46) * (it / 54.0) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
