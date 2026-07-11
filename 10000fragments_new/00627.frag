uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.38) * q.xz;
	q.xy = rot2(time * 0.39) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.95, q.y);
	return length(w) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.63);
	vec3 rd = normalize(vec3(p, 1.00));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.15 + time * 0.27, vec3(0.49, 0.54, 0.43), vec3(0.37, 0.39, 0.43), vec3(1.19, 1.20, 0.99), vec3(0.78, 0.16, 0.10)) * fog;
	col += vec3(0.83, 0.20, 0.70) * (it / 53.0) * 0.42;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
