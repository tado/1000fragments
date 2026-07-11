uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.28) * q.xz;
	q.xy = rot2(time * 0.39) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.87, q.y);
	return length(w) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.29);
	vec3 rd = normalize(vec3(p, 1.11));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.19 + time * 0.17, vec3(0.51, 0.46, 0.57), vec3(0.45, 0.37, 0.31), vec3(0.97, 1.40, 1.31), vec3(0.10, 0.38, 0.46)) * fog;
	col += vec3(0.72, 0.65, 0.99) * (it / 49.0) * 0.55;
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
