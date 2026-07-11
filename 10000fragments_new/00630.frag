uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.71;
	float g = dot(sin(q * 3.55), cos(q.zxy * 3.55));
	return (abs(g) - 0.80) / (3.55 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.31);
	vec3 rd = normalize(vec3(p, 1.64));
	rd.xy = rot2(time * 0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.34 + time * 0.00, vec3(0.45, 0.56, 0.40), vec3(0.37, 0.31, 0.49), vec3(1.12, 1.20, 1.12), vec3(0.58, 0.88, 0.54)) * fog;
	col += vec3(0.27, 0.65, 0.43) * (it / 64.0) * 0.88;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
