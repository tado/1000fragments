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
		q = abs(q) - vec3(0.57, 0.39, 0.34);
		q.xy = rot2(0.60 + time * 0.35) * q.xy;
		q.xz = rot2(1.39) * q.xz;
		q *= 1.58; sc *= 1.58;
	}
	vec3 b = abs(q) - vec3(0.41);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.88);
	vec3 rd = normalize(vec3(p, 1.36));
	rd.xy = rot2(time * -0.20) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.19 + time * 0.10, vec3(0.56, 0.44, 0.57), vec3(0.45, 0.40, 0.37), vec3(0.82, 1.00, 0.89), vec3(0.48, 0.06, 0.47)) * fog;
	col += vec3(0.62, 0.79, 0.98) * (it / 66.0) * 0.35;
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
