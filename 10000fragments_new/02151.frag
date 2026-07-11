uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.74) * q.xz;
	q.xy = rot2(time * 0.67) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.17, q.y);
	return length(w) - 0.38;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.06);
	vec3 rd = normalize(vec3(p, 1.75));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.11 + time * 0.08, vec3(0.54, 0.48, 0.47), vec3(0.31, 0.36, 0.49), vec3(1.32, 1.33, 1.18), vec3(0.61, 0.86, 0.69)) * fog;
	col += vec3(0.64, 0.75, 0.53) * (it / 52.0) * 0.92;
	col = fract(col * 1.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
