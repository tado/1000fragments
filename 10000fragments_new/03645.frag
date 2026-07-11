uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.52) * q.xz;
	q.xy = rot2(time * 0.87) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.82, q.y);
	return length(w) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.20);
	vec3 rd = normalize(vec3(p, 1.52));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.27 + time * 0.31, vec3(0.58, 0.51, 0.57), vec3(0.48, 0.36, 0.35), vec3(1.12, 0.81, 1.02), vec3(0.85, 0.70, 0.76)) * fog;
	col += vec3(0.38, 0.80, 0.84) * (it / 60.0) * 0.53;
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 1.09 + time * 4.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
