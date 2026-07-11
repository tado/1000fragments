uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.29) * q.xz;
	q.xy = rot2(time * 0.96) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.26, q.y);
	return length(w) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 1.49));
	rd.xy = rot2(time * -0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.12 + time * 0.03, vec3(0.49, 0.56, 0.46), vec3(0.49, 0.44, 0.45), vec3(0.75, 1.26, 1.26), vec3(0.97, 0.45, 0.50)) * fog;
	col += vec3(0.89, 0.65, 0.91) * (it / 60.0) * 0.44;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
