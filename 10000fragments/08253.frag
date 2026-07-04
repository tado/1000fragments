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
		q = abs(q) - vec3(0.36, 0.39, 0.65);
		q.xy = rot2(0.27 + time * 0.23) * q.xy;
		q.xz = rot2(0.70) * q.xz;
		q *= 1.65; sc *= 1.65;
	}
	vec3 b = abs(q) - vec3(0.32);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.51);
	vec3 rd = normalize(vec3(p, 1.32));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.33 + time * 0.19, vec3(0.53, 0.50, 0.59), vec3(0.48, 0.43, 0.31), vec3(0.91, 1.30, 1.26), vec3(0.55, 0.23, 0.70)) * fog;
	col += vec3(0.24, 0.49, 0.66) * (it / 72.0) * 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
