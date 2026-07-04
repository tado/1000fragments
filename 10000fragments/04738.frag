uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.85;
	vec2 g = mod(vec2(q.x, q.z), 2.32) - 1.16;
	float d = length(g) - (0.28 + 0.06 * sin(q.y * 2.01 + time * 1.66));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.10));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.37 + time * 0.02, vec3(0.52, 0.60, 0.51), vec3(0.46, 0.41, 0.43), vec3(1.17, 1.34, 1.32), vec3(0.89, 0.64, 0.85)) * fog;
	col += vec3(0.87, 0.45, 0.50) * (it / 64.0) * 0.49;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
