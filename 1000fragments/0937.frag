uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.11) * q.xz;
	q.xy = rot2(time * 0.81) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.19, q.y);
	return length(w) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.11);
	vec3 rd = normalize(vec3(p, 1.61));
	rd.xy = rot2(time * 0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.40 + time * 0.37, vec3(0.43, 0.51, 0.49), vec3(0.41, 0.37, 0.42), vec3(0.94, 0.75, 0.84), vec3(0.07, 0.60, 0.06)) * fog;
	col += vec3(0.61, 0.87, 0.50) * (it / 50.0) * 0.55;
	col = clamp((col - 0.5) * 1.62 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
