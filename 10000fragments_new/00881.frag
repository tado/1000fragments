uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.61;
	float g = dot(sin(q * 3.80), cos(q.zxy * 3.80));
	return (abs(g) - 0.75) / (3.80 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 0.97));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.16 + time * 0.40, vec3(0.49, 0.50, 0.51), vec3(0.37, 0.39, 0.43), vec3(0.75, 0.93, 1.16), vec3(0.64, 0.49, 0.55)) * fog;
	col += vec3(0.55, 0.90, 0.52) * (it / 64.0) * 0.96;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
