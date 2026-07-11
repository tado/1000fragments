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
		q = abs(q) - vec3(0.65, 0.60, 0.46);
		q.xy = rot2(0.98 + time * 0.26) * q.xy;
		q.xz = rot2(1.21) * q.xz;
		q *= 1.35; sc *= 1.35;
	}
	vec3 b = abs(q) - vec3(0.58);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.43));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.26 + time * 0.30, vec3(0.50, 0.50, 0.52), vec3(0.45, 0.35, 0.33), vec3(0.91, 1.01, 0.73), vec3(0.21, 0.17, 0.35)) * fog;
	col += vec3(0.53, 0.75, 0.36) * (it / 69.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
