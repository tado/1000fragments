uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.70;
	vec2 g = mod(vec2(q.x, q.z), 2.10) - 1.05;
	float d = length(g) - (0.25 + 0.11 * sin(q.y * 1.94 + time * 3.34));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.38));
	rd.xy = rot2(time * -0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.26 + time * 0.21, vec3(0.53, 0.50, 0.54), vec3(0.46, 0.45, 0.32), vec3(1.30, 0.90, 1.09), vec3(0.03, 0.60, 0.35)) * fog;
	col += vec3(0.37, 0.83, 0.21) * (it / 66.0) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
