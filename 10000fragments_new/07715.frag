uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.75;
	float g = dot(sin(q * 2.43), cos(q.zxy * 2.43));
	return (abs(g) - 0.31) / (2.43 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.12);
	vec3 rd = normalize(vec3(p, 1.27));
	rd.xy = rot2(time * 0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.36 + time * 0.13, vec3(0.40, 0.43, 0.56), vec3(0.50, 0.32, 0.43), vec3(1.34, 0.74, 1.02), vec3(0.85, 0.11, 0.28)) * fog;
	col += vec3(0.70, 0.33, 0.58) * (it / 62.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
