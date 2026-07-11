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
		q = abs(q) - vec3(0.37, 0.69, 0.38);
		q.xy = rot2(0.96 + time * 0.16) * q.xy;
		q.xz = rot2(1.45) * q.xz;
		q *= 1.38; sc *= 1.38;
	}
	vec3 b = abs(q) - vec3(0.51);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.47);
	vec3 rd = normalize(vec3(p, 1.19));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.22 + time * 0.31, vec3(0.52, 0.48, 0.60), vec3(0.45, 0.39, 0.40), vec3(0.88, 0.94, 1.11), vec3(0.85, 0.93, 0.87)) * fog;
	col += vec3(0.77, 0.28, 0.91) * (it / 69.0) * 0.52;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
