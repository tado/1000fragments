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
		q = abs(q) - vec3(0.42, 0.54, 0.32);
		q.xy = rot2(1.33 + time * 0.35) * q.xy;
		q.xz = rot2(0.63) * q.xz;
		q *= 1.41; sc *= 1.41;
	}
	vec3 b = abs(q) - vec3(0.30);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.65);
	vec3 rd = normalize(vec3(p, 1.51));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.34 + time * 0.15, vec3(0.41, 0.41, 0.42), vec3(0.44, 0.44, 0.50), vec3(1.31, 1.19, 1.02), vec3(0.63, 0.44, 0.61)) * fog;
	col += vec3(0.96, 0.94, 0.87) * (it / 72.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
