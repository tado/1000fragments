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
		q = abs(q) - vec3(0.53, 0.79, 0.78);
		q.xy = rot2(0.33 + time * 0.11) * q.xy;
		q.xz = rot2(0.69) * q.xz;
		q *= 1.37; sc *= 1.37;
	}
	vec3 b = abs(q) - vec3(0.51);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.41);
	vec3 rd = normalize(vec3(p, 1.17));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.32 + time * 0.16, vec3(0.42, 0.40, 0.45), vec3(0.45, 0.48, 0.31), vec3(1.02, 0.97, 1.07), vec3(0.55, 0.81, 0.82)) * fog;
	col += vec3(0.93, 0.65, 0.99) * (it / 57.0) * 0.72;
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
