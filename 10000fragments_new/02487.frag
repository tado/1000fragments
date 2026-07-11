uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.00) * q.xz;
	q.xy = rot2(time * 1.18) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.04, q.y);
	return length(w) - 0.15;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.53);
	vec3 rd = normalize(vec3(p, 1.69));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.39 + time * 0.35, vec3(0.49, 0.53, 0.54), vec3(0.47, 0.42, 0.40), vec3(0.99, 0.82, 0.90), vec3(0.13, 0.37, 0.53)) * fog;
	col += vec3(0.35, 0.28, 0.64) * (it / 49.0) * 0.59;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
