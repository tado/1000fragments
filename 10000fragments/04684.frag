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
		q = abs(q) - vec3(0.42, 0.44, 0.70);
		q.xy = rot2(1.25 + time * 0.34) * q.xy;
		q.xz = rot2(0.70) * q.xz;
		q *= 1.65; sc *= 1.65;
	}
	vec3 b = abs(q) - vec3(0.48);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.05);
	vec3 rd = normalize(vec3(p, 1.31));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.17 + time * 0.31, vec3(0.57, 0.54, 0.45), vec3(0.49, 0.31, 0.45), vec3(0.84, 1.33, 0.83), vec3(0.28, 0.25, 0.55)) * fog;
	col += vec3(0.97, 0.95, 0.96) * (it / 55.0) * 0.40;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
