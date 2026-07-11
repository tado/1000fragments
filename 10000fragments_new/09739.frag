uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.89) * q.xz;
	q.xy = rot2(time * 0.34) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.08, q.y);
	return length(w) - 0.28;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.19);
	vec3 rd = normalize(vec3(p, 1.33));
	rd.xy = rot2(time * -0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.14 + time * 0.37, vec3(0.46, 0.54, 0.58), vec3(0.43, 0.37, 0.32), vec3(1.25, 0.73, 1.34), vec3(0.84, 0.88, 0.06)) * fog;
	col += vec3(0.74, 0.37, 0.91) * (it / 58.0) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
