uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.45;
	vec2 g = mod(vec2(q.x, q.z), 1.88) - 0.94;
	float d = length(g) - (0.23 + 0.07 * sin(q.y * 1.99 + time * 3.48));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.94, 0.94, -3.0);
	vec3 rd = normalize(vec3(p, 1.28));
	rd.xy = rot2(time * -0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.31 + time * 0.14, vec3(0.55, 0.58, 0.60), vec3(0.34, 0.32, 0.50), vec3(1.25, 0.76, 1.04), vec3(0.47, 0.29, 0.60)) * fog;
	col += vec3(0.81, 0.62, 0.35) * (it / 55.0) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
