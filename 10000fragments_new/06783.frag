uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.81) * q.xz;
	q.xy = rot2(time * 0.41) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.23, q.y);
	return length(w) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.97);
	vec3 rd = normalize(vec3(p, 0.97));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.13 + time * 0.34, vec3(0.58, 0.42, 0.50), vec3(0.39, 0.42, 0.41), vec3(1.17, 0.74, 1.12), vec3(0.95, 0.74, 0.53)) * fog;
	col += vec3(0.91, 0.45, 0.73) * (it / 60.0) * 0.37;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
