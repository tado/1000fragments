uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.73) * q.xz;
	q.xy = rot2(time * 0.67) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.23, q.y);
	return length(w) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.87);
	vec3 rd = normalize(vec3(p, 1.60));
	rd.xy = rot2(time * 0.20) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.20 + time * 0.34, vec3(0.45, 0.46, 0.60), vec3(0.35, 0.39, 0.36), vec3(0.83, 1.00, 1.12), vec3(0.74, 0.84, 0.15)) * fog;
	col += vec3(0.53, 0.21, 0.83) * (it / 68.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
