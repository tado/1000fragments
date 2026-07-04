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
		q = abs(q) - vec3(0.47, 0.51, 0.75);
		q.xy = rot2(1.42 + time * 0.31) * q.xy;
		q.xz = rot2(0.73) * q.xz;
		q *= 1.41; sc *= 1.41;
	}
	vec3 b = abs(q) - vec3(0.32);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.74);
	vec3 rd = normalize(vec3(p, 0.99));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.34 + time * 0.17, vec3(0.43, 0.50, 0.42), vec3(0.30, 0.34, 0.50), vec3(0.93, 1.00, 1.04), vec3(0.30, 0.97, 0.62)) * fog;
	col += vec3(0.28, 0.39, 0.88) * (it / 55.0) * 0.53;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
