uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.39;
	vec2 g = mod(vec2(q.x, q.z), 2.23) - 1.12;
	float d = length(g) - (0.27 + 0.05 * sin(q.y * 1.04 + time * 1.50));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 1.56));
	rd.xy = rot2(time * 0.27) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.32 + time * 0.08, vec3(0.45, 0.52, 0.51), vec3(0.34, 0.35, 0.36), vec3(1.20, 0.93, 0.97), vec3(0.67, 0.94, 0.96)) * fog;
	col += vec3(0.22, 0.97, 0.99) * (it / 63.0) * 0.45;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.64 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
