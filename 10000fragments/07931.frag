uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.68;
	vec2 g = mod(vec2(q.x, q.z), 2.31) - 1.15;
	float d = length(g) - (0.15 + 0.09 * sin(q.y * 2.91 + time * 2.45));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.15, 1.15, -3.0);
	vec3 rd = normalize(vec3(p, 1.07));
	rd.xy = rot2(time * 0.20) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.26 + time * 0.11, vec3(0.59, 0.43, 0.55), vec3(0.37, 0.48, 0.46), vec3(1.34, 0.74, 1.30), vec3(0.54, 0.01, 0.82)) * fog;
	col += vec3(0.56, 0.48, 0.37) * (it / 58.0) * 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
