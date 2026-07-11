uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.96) * q.xz;
	q.xy = rot2(time * 0.71) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.38, q.y);
	return length(w) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.33);
	vec3 rd = normalize(vec3(p, 0.94));
	rd.xy = rot2(time * -0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.26 + time * 0.34, vec3(0.45, 0.50, 0.42), vec3(0.33, 0.48, 0.43), vec3(0.79, 0.80, 0.84), vec3(0.38, 0.56, 0.17)) * fog;
	col += vec3(0.55, 0.85, 0.54) * (it / 68.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
