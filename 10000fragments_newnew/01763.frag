uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.67;
	vec2 g = mod(vec2(q.x, q.z), 2.02) - 1.01;
	float d = length(g) - (0.28 + 0.10 * sin(q.y * 2.14 + time * 3.26));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.51));
	rd.xy = rot2(time * 0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.36 + time * 0.11, vec3(0.53, 0.51, 0.43), vec3(0.49, 0.44, 0.42), vec3(0.78, 1.10, 0.88), vec3(0.21, 0.70, 0.89)) * fog;
	col += vec3(0.77, 0.88, 0.98) * (it / 48.0) * 0.86;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
