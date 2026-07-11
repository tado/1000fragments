uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.88) * q.xz;
	q.xy = rot2(time * 0.63) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.85, q.y);
	return length(w) - 0.18;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.55);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2(time * 0.26) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.11 + time * 0.30, vec3(0.53, 0.49, 0.53), vec3(0.36, 0.41, 0.32), vec3(0.81, 0.85, 0.96), vec3(0.49, 0.29, 0.36)) * fog;
	col += vec3(0.97, 0.25, 0.61) * (it / 71.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
