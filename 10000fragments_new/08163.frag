uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.05) * q.xz;
	q.xy = rot2(time * 0.98) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.11, q.y);
	return length(w) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.79);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.19 + time * 0.18, vec3(0.50, 0.46, 0.58), vec3(0.48, 0.33, 0.49), vec3(1.16, 1.14, 0.79), vec3(0.72, 0.31, 0.99)) * fog;
	col += vec3(0.89, 0.58, 0.64) * (it / 50.0) * 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
