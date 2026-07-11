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
		q = abs(q) - vec3(0.48, 0.60, 0.49);
		q.xy = rot2(1.40 + time * 0.32) * q.xy;
		q.xz = rot2(0.68) * q.xz;
		q *= 1.45; sc *= 1.45;
	}
	vec3 b = abs(q) - vec3(0.45);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.26);
	vec3 rd = normalize(vec3(p, 1.71));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.35 + time * 0.33, vec3(0.55, 0.48, 0.50), vec3(0.38, 0.36, 0.50), vec3(1.02, 0.96, 1.34), vec3(0.43, 0.12, 0.77)) * fog;
	col += vec3(0.70, 0.87, 0.77) * (it / 71.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
