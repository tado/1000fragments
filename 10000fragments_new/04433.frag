uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.36) * q.xz;
	q.xy = rot2(time * 0.37) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.24, q.y);
	return length(w) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.60);
	vec3 rd = normalize(vec3(p, 1.19));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.30 + time * 0.15, vec3(0.44, 0.43, 0.56), vec3(0.49, 0.48, 0.36), vec3(0.99, 1.12, 0.96), vec3(0.01, 0.16, 0.91)) * fog;
	col += vec3(0.40, 0.69, 0.21) * (it / 60.0) * 0.30;
	col *= 0.81 + 0.18 * sin(gl_FragCoord.y * 1.55 + time * 15.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
