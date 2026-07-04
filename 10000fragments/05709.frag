uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.02) * q.xz;
	q.xy = rot2(time * 0.41) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.13, q.y);
	return length(w) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 1.13));
	rd.xy = rot2(time * -0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.32 + time * 0.37, vec3(0.59, 0.54, 0.42), vec3(0.31, 0.44, 0.39), vec3(1.25, 1.14, 0.90), vec3(0.27, 0.16, 0.63)) * fog;
	col += vec3(0.38, 0.70, 0.39) * (it / 72.0) * 0.77;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
