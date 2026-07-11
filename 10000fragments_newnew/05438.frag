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
		q = abs(q) - vec3(0.71, 0.78, 0.40);
		q.xy = rot2(0.59 + time * 0.43) * q.xy;
		q.xz = rot2(1.36) * q.xz;
		q *= 1.56; sc *= 1.56;
	}
	vec3 b = abs(q) - vec3(0.58);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.97);
	vec3 rd = normalize(vec3(p, 1.79));
	rd.xy = rot2(time * 0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.18 + time * 0.17, vec3(0.44, 0.54, 0.44), vec3(0.38, 0.32, 0.38), vec3(1.24, 1.02, 1.37), vec3(0.73, 0.63, 0.83)) * fog;
	col += vec3(0.69, 0.80, 0.22) * (it / 52.0) * 0.61;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
