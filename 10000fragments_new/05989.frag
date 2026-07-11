uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.87) * q.xz;
	q.xy = rot2(time * 0.68) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.03, q.y);
	return length(w) - 0.16;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.17);
	vec3 rd = normalize(vec3(p, 1.14));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.39 + time * 0.16, vec3(0.47, 0.52, 0.41), vec3(0.40, 0.47, 0.44), vec3(1.19, 1.08, 1.15), vec3(0.35, 0.17, 0.01)) * fog;
	col += vec3(0.64, 0.57, 0.52) * (it / 60.0) * 0.75;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
