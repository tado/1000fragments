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
		q = abs(q) - vec3(0.73, 0.52, 0.43);
		q.xy = rot2(1.41 + time * 0.27) * q.xy;
		q.xz = rot2(0.84) * q.xz;
		q *= 1.30; sc *= 1.30;
	}
	vec3 b = abs(q) - vec3(0.41);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.19);
	vec3 rd = normalize(vec3(p, 1.63));
	rd.xy = rot2(time * 0.38) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.28 + time * 0.16, vec3(0.54, 0.51, 0.53), vec3(0.46, 0.32, 0.35), vec3(1.11, 0.83, 0.96), vec3(0.25, 0.64, 0.09)) * fog;
	col += vec3(0.64, 0.91, 0.93) * (it / 58.0) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
