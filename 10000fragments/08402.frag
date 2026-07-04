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
		q = abs(q) - vec3(0.66, 0.41, 0.38);
		q.xy = rot2(0.36 + time * 0.30) * q.xy;
		q.xz = rot2(1.49) * q.xz;
		q *= 1.66; sc *= 1.66;
	}
	vec3 b = abs(q) - vec3(0.51);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.63);
	vec3 rd = normalize(vec3(p, 1.39));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.30 + time * 0.15, vec3(0.59, 0.41, 0.54), vec3(0.46, 0.34, 0.31), vec3(1.06, 0.79, 0.93), vec3(0.10, 0.25, 0.89)) * fog;
	col += vec3(0.32, 0.56, 0.54) * (it / 53.0) * 0.35;
	col = fract(col * 2.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
