uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.34) * q.xz;
	q.xy = rot2(time * 0.50) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.82, q.y);
	return length(w) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.24);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * -0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.24 + time * 0.07, vec3(0.44, 0.57, 0.41), vec3(0.35, 0.36, 0.49), vec3(1.38, 1.38, 1.26), vec3(0.56, 0.47, 0.49)) * fog;
	col += vec3(0.55, 0.53, 0.75) * (it / 54.0) * 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
