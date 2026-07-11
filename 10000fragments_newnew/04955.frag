uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.31) * q.xz;
	q.xy = rot2(time * 0.46) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.17, q.y);
	return length(w) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.60);
	vec3 rd = normalize(vec3(p, 1.06));
	rd.xy = rot2(time * -0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.24 + time * 0.02, vec3(0.57, 0.58, 0.44), vec3(0.45, 0.46, 0.50), vec3(0.91, 0.75, 0.79), vec3(0.59, 0.10, 0.85)) * fog;
	col += vec3(0.23, 0.90, 0.85) * (it / 54.0) * 0.76;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
