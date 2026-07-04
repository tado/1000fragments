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
		q = abs(q) - vec3(0.44, 0.55, 0.63);
		q.xy = rot2(0.91 + time * 0.35) * q.xy;
		q.xz = rot2(0.20) * q.xz;
		q *= 1.56; sc *= 1.56;
	}
	vec3 b = abs(q) - vec3(0.30);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.27);
	vec3 rd = normalize(vec3(p, 1.07));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.32 + time * 0.12, vec3(0.48, 0.41, 0.42), vec3(0.50, 0.45, 0.49), vec3(1.35, 1.40, 1.32), vec3(0.11, 0.88, 0.52)) * fog;
	col += vec3(0.76, 0.57, 0.58) * (it / 63.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
