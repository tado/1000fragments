uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.42) * q.xz;
	q.xy = rot2(time * 0.43) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.26, q.y);
	return length(w) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.80);
	vec3 rd = normalize(vec3(p, 1.18));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.20 + time * 0.05, vec3(0.51, 0.60, 0.50), vec3(0.43, 0.34, 0.42), vec3(1.04, 1.04, 1.30), vec3(0.50, 0.14, 0.52)) * fog;
	col += vec3(0.45, 0.25, 0.51) * (it / 63.0) * 0.91;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
