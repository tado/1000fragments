uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.71) * q.xz;
	q.xy = rot2(time * 0.76) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.80, q.y);
	return length(w) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.17);
	vec3 rd = normalize(vec3(p, 1.64));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.22 + time * 0.21, vec3(0.47, 0.51, 0.40), vec3(0.38, 0.37, 0.48), vec3(1.33, 1.06, 1.18), vec3(0.02, 0.42, 0.24)) * fog;
	col += vec3(0.40, 0.69, 0.86) * (it / 59.0) * 0.83;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
