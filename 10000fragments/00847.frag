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
		q = abs(q) - vec3(0.38, 0.63, 0.78);
		q.xy = rot2(0.61 + time * 0.21) * q.xy;
		q.xz = rot2(1.38) * q.xz;
		q *= 1.59; sc *= 1.59;
	}
	vec3 b = abs(q) - vec3(0.42);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.49);
	vec3 rd = normalize(vec3(p, 1.34));
	rd.xy = rot2(time * 0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.31 + time * 0.05, vec3(0.53, 0.45, 0.49), vec3(0.32, 0.50, 0.37), vec3(1.35, 1.20, 1.18), vec3(0.05, 0.47, 0.93)) * fog;
	col += vec3(0.51, 0.53, 0.85) * (it / 72.0) * 0.59;
	col = fract(col * 2.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
