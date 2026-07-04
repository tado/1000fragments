uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.55;
	vec2 g = mod(vec2(q.x, q.z), 1.95) - 0.98;
	float d = length(g) - (0.16 + 0.09 * sin(q.y * 2.51 + time * 3.89));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.98, 0.98, -3.0);
	vec3 rd = normalize(vec3(p, 1.14));
	rd.xy = rot2(time * -0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.27 + time * 0.09, vec3(0.43, 0.53, 0.50), vec3(0.36, 0.49, 0.42), vec3(1.25, 1.38, 0.91), vec3(0.66, 0.81, 0.62)) * fog;
	col += vec3(0.38, 0.76, 0.26) * (it / 50.0) * 0.96;
	col *= 0.82 + 0.12 * sin(gl_FragCoord.y * 1.40 + time * 10.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
