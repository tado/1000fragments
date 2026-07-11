uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.56) * q.xz;
	q.xy = rot2(time * 0.55) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.83, q.y);
	return length(w) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.21);
	vec3 rd = normalize(vec3(p, 1.17));
	rd.xy = rot2(time * 0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.35 + time * 0.27, vec3(0.58, 0.50, 0.54), vec3(0.38, 0.33, 0.38), vec3(0.71, 1.07, 1.20), vec3(0.47, 0.82, 0.63)) * fog;
	col += vec3(0.83, 0.42, 0.33) * (it / 50.0) * 0.89;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
