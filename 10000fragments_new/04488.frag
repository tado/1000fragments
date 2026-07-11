uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.86) * q.xz;
	q.xy = rot2(time * 0.52) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.01, q.y);
	return length(w) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.76);
	vec3 rd = normalize(vec3(p, 1.26));
	rd.xy = rot2(time * -0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.11 + time * 0.03, vec3(0.56, 0.48, 0.50), vec3(0.34, 0.42, 0.34), vec3(0.96, 1.12, 0.71), vec3(0.45, 0.44, 0.87)) * fog;
	col += vec3(0.46, 0.37, 0.52) * (it / 65.0) * 0.90;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
