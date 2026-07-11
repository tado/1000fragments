uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.61;
	float g = dot(sin(q * 2.48), cos(q.zxy * 2.48));
	return (abs(g) - 0.33) / (2.48 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 1.14));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.16 + time * 0.12, vec3(0.45, 0.52, 0.44), vec3(0.33, 0.31, 0.48), vec3(1.21, 0.98, 1.02), vec3(0.67, 0.89, 0.16)) * fog;
	col += vec3(0.93, 0.52, 0.61) * (it / 61.0) * 0.45;
	col *= 0.83 + 0.16 * sin(gl_FragCoord.y * 2.21 + time * 17.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
