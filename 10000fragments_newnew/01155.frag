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
		q = abs(q) - vec3(0.80, 0.51, 0.49);
		q.xy = rot2(1.08 + time * 0.12) * q.xy;
		q.xz = rot2(0.95) * q.xz;
		q *= 1.64; sc *= 1.64;
	}
	vec3 b = abs(q) - vec3(0.35);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.42);
	vec3 rd = normalize(vec3(p, 1.27));
	rd.xy = rot2(time * 0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.36 + time * 0.09, vec3(0.50, 0.42, 0.59), vec3(0.39, 0.32, 0.30), vec3(1.05, 1.09, 1.21), vec3(0.15, 0.28, 0.32)) * fog;
	col += vec3(0.46, 0.39, 0.93) * (it / 69.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
