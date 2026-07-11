uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.47) * q.xz;
	q.xy = rot2(time * 0.47) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.24, q.y);
	return length(w) - 0.18;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.28);
	vec3 rd = normalize(vec3(p, 1.30));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.37 + time * 0.28, vec3(0.47, 0.52, 0.46), vec3(0.37, 0.42, 0.43), vec3(0.84, 1.30, 1.07), vec3(0.92, 0.35, 0.97)) * fog;
	col += vec3(0.65, 0.29, 0.95) * (it / 53.0) * 0.37;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
