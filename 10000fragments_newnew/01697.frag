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
		q = abs(q) - vec3(0.33, 0.35, 0.58);
		q.xy = rot2(0.39 + time * 0.27) * q.xy;
		q.xz = rot2(0.68) * q.xz;
		q *= 1.40; sc *= 1.40;
	}
	vec3 b = abs(q) - vec3(0.36);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.82);
	vec3 rd = normalize(vec3(p, 1.78));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.16 + time * 0.00, vec3(0.60, 0.42, 0.59), vec3(0.44, 0.34, 0.36), vec3(1.33, 0.89, 0.94), vec3(0.91, 0.04, 0.01)) * fog;
	col += vec3(0.89, 0.79, 0.29) * (it / 60.0) * 0.87;
	col = clamp((col - 0.5) * 1.75 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
