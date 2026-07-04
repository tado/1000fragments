uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.03;
	vec2 g = mod(vec2(q.x, q.z), 2.14) - 1.07;
	float d = length(g) - (0.25 + 0.10 * sin(q.y * 1.08 + time * 2.02));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.07, 1.07, -3.0);
	vec3 rd = normalize(vec3(p, 1.59));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.35 + time * 0.29, vec3(0.53, 0.58, 0.53), vec3(0.50, 0.38, 0.47), vec3(0.87, 0.75, 0.74), vec3(0.30, 0.12, 0.76)) * fog;
	col += vec3(0.64, 0.80, 0.93) * (it / 63.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
