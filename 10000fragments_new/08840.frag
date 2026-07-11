uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.43;
	float g = dot(sin(q * 1.80), cos(q.zxy * 1.80));
	return (abs(g) - 0.44) / (1.80 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.66);
	vec3 rd = normalize(vec3(p, 1.68));
	rd.xy = rot2(time * 0.36) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.15 + time * 0.30, vec3(0.54, 0.54, 0.46), vec3(0.34, 0.37, 0.45), vec3(0.87, 1.24, 0.95), vec3(0.79, 0.75, 0.19)) * fog;
	col += vec3(0.46, 0.80, 0.27) * (it / 61.0) * 0.64;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
