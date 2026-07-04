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
		q = abs(q) - vec3(0.43, 0.66, 0.78);
		q.xy = rot2(1.43 + time * 0.23) * q.xy;
		q.xz = rot2(1.13) * q.xz;
		q *= 1.61; sc *= 1.61;
	}
	vec3 b = abs(q) - vec3(0.50);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.88);
	vec3 rd = normalize(vec3(p, 1.71));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.35 + time * 0.02, vec3(0.42, 0.51, 0.59), vec3(0.49, 0.45, 0.46), vec3(0.78, 1.27, 1.32), vec3(0.57, 0.82, 0.38)) * fog;
	col += vec3(0.93, 0.26, 0.52) * (it / 58.0) * 0.32;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
