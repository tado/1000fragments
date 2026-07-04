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
		q = abs(q) - vec3(0.64, 0.74, 0.63);
		q.xy = rot2(0.49 + time * 0.20) * q.xy;
		q.xz = rot2(0.53) * q.xz;
		q *= 1.65; sc *= 1.65;
	}
	vec3 b = abs(q) - vec3(0.39);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.30);
	vec3 rd = normalize(vec3(p, 1.38));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.26 + time * 0.16, vec3(0.49, 0.47, 0.47), vec3(0.38, 0.42, 0.43), vec3(0.89, 1.20, 0.80), vec3(0.80, 0.04, 0.63)) * fog;
	col += vec3(0.87, 0.35, 0.24) * (it / 69.0) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
