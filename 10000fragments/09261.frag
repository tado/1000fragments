uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.09;
	vec2 g = mod(vec2(q.x, q.z), 2.57) - 1.28;
	float d = length(g) - (0.20 + 0.07 * sin(q.y * 1.98 + time * 2.92));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.28, 1.28, -3.0);
	vec3 rd = normalize(vec3(p, 1.04));
	rd.xy = rot2(time * 0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.27 + time * 0.28, vec3(0.48, 0.55, 0.49), vec3(0.45, 0.44, 0.47), vec3(1.32, 0.72, 0.74), vec3(0.61, 0.97, 0.58)) * fog;
	col += vec3(0.28, 0.90, 0.92) * (it / 52.0) * 0.37;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
