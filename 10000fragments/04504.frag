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
		q = abs(q) - vec3(0.44, 0.52, 0.69);
		q.xy = rot2(0.77 + time * 0.26) * q.xy;
		q.xz = rot2(0.96) * q.xz;
		q *= 1.49; sc *= 1.49;
	}
	vec3 b = abs(q) - vec3(0.45);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.17);
	vec3 rd = normalize(vec3(p, 1.57));
	rd.xy = rot2(time * -0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.40 + time * 0.27, vec3(0.52, 0.46, 0.49), vec3(0.32, 0.46, 0.37), vec3(0.79, 1.08, 1.25), vec3(0.22, 0.60, 0.17)) * fog;
	col += vec3(0.89, 0.41, 0.54) * (it / 58.0) * 0.86;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
