uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.74) * q.xz;
	q.xy = rot2(time * 0.62) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.00, q.y);
	return length(w) - 0.17;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.41);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.15 + time * 0.27, vec3(0.46, 0.45, 0.59), vec3(0.40, 0.41, 0.49), vec3(1.02, 0.99, 1.26), vec3(0.33, 0.76, 0.94)) * fog;
	col += vec3(0.45, 0.85, 0.94) * (it / 70.0) * 0.89;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.66 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
