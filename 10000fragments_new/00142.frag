uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.55) * q.xz;
	q.xy = rot2(time * 0.88) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.34, q.y);
	return length(w) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.23);
	vec3 rd = normalize(vec3(p, 1.29));
	rd.xy = rot2(time * -0.38) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.27 + time * 0.28, vec3(0.51, 0.60, 0.54), vec3(0.38, 0.35, 0.43), vec3(1.08, 0.90, 1.05), vec3(0.15, 0.09, 0.32)) * fog;
	col += vec3(0.86, 0.58, 0.52) * (it / 58.0) * 0.39;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
