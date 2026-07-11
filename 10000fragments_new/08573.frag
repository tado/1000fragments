uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.18;
	float g = dot(sin(q * 3.73), cos(q.zxy * 3.73));
	return (abs(g) - 0.53) / (3.73 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.70);
	vec3 rd = normalize(vec3(p, 1.46));
	rd.xy = rot2(time * -0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.37 + time * 0.09, vec3(0.46, 0.60, 0.45), vec3(0.31, 0.41, 0.48), vec3(0.90, 1.08, 1.34), vec3(0.74, 0.59, 0.89)) * fog;
	col += vec3(0.21, 0.43, 0.51) * (it / 71.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
