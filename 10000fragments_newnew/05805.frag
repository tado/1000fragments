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
		q = abs(q) - vec3(0.59, 0.74, 0.59);
		q.xy = rot2(0.35 + time * 0.13) * q.xy;
		q.xz = rot2(0.32) * q.xz;
		q *= 1.55; sc *= 1.55;
	}
	vec3 b = abs(q) - vec3(0.32);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.59);
	vec3 rd = normalize(vec3(p, 1.65));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.10 + time * 0.37, vec3(0.57, 0.46, 0.43), vec3(0.46, 0.43, 0.49), vec3(0.89, 1.09, 0.85), vec3(0.55, 0.52, 0.66)) * fog;
	col += vec3(0.29, 0.49, 0.61) * (it / 53.0) * 0.61;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
