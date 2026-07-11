uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.58) * q.xz;
	q.xy = rot2(time * 0.99) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.20, q.y);
	return length(w) - 0.23;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.71);
	vec3 rd = normalize(vec3(p, 1.53));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.36 + time * 0.17, vec3(0.43, 0.43, 0.48), vec3(0.48, 0.37, 0.33), vec3(1.12, 0.94, 1.01), vec3(0.49, 0.16, 0.36)) * fog;
	col += vec3(0.91, 0.48, 0.77) * (it / 72.0) * 0.67;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
