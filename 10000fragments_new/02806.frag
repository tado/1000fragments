uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.19) * q.xz;
	q.xy = rot2(time * 0.57) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.98, q.y);
	return length(w) - 0.24;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.31);
	vec3 rd = normalize(vec3(p, 0.94));
	rd.xy = rot2(time * 0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.13 + time * 0.29, vec3(0.55, 0.47, 0.45), vec3(0.42, 0.45, 0.30), vec3(0.97, 0.83, 1.18), vec3(0.93, 0.85, 0.61)) * fog;
	col += vec3(0.84, 0.97, 0.89) * (it / 67.0) * 0.32;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
