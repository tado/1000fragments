uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.65, 0.79, 0.56);
		q.xy = rot2(0.32 + time * 0.43) * q.xy;
		q.xz = rot2(0.81) * q.xz;
		q *= 1.30; sc *= 1.30;
	}
	vec3 b = abs(q) - vec3(0.56);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.91);
	vec3 rd = normalize(vec3(p, 1.03));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.28 + time * 0.15, vec3(0.47, 0.51, 0.49), vec3(0.49, 0.47, 0.46), vec3(1.26, 0.81, 1.10), vec3(0.65, 0.68, 0.28)) * fog;
	col += vec3(0.62, 0.30, 0.66) * (it / 49.0) * 0.72;
	col = fract(col * 1.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
