uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.00;
	vec2 g = mod(vec2(q.x, q.z), 2.06) - 1.03;
	float d = length(g) - (0.27 + 0.07 * sin(q.y * 2.76 + time * 2.96));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.61));
	rd.xy = rot2(time * 0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.13 + time * 0.33, vec3(0.52, 0.51, 0.48), vec3(0.42, 0.33, 0.41), vec3(1.15, 1.35, 0.78), vec3(0.83, 0.05, 0.54)) * fog;
	col += vec3(0.94, 0.22, 0.44) * (it / 69.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
