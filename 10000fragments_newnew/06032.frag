uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.07) * q.xz;
	q.xy = rot2(time * 0.50) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.16, q.y);
	return length(w) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.91);
	vec3 rd = normalize(vec3(p, 1.29));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.12 + time * 0.16, vec3(0.46, 0.55, 0.47), vec3(0.44, 0.46, 0.45), vec3(0.96, 0.70, 0.77), vec3(0.71, 0.10, 0.49)) * fog;
	col += vec3(0.57, 0.21, 0.68) * (it / 60.0) * 0.58;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
