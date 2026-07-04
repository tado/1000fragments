uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.49) * q.xz;
	q.xy = rot2(time * 0.52) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.99, q.y);
	return length(w) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.09);
	vec3 rd = normalize(vec3(p, 1.41));
	rd.xy = rot2(time * -0.22) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.14 + time * 0.25, vec3(0.45, 0.57, 0.53), vec3(0.44, 0.31, 0.30), vec3(1.09, 1.17, 0.77), vec3(0.47, 0.64, 0.95)) * fog;
	col += vec3(0.64, 0.76, 0.41) * (it / 58.0) * 0.64;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
