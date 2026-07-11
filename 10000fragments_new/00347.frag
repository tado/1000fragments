uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.69;
	float g = dot(sin(q * 2.54), cos(q.zxy * 2.54));
	return (abs(g) - 0.63) / (2.54 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.50);
	vec3 rd = normalize(vec3(p, 1.36));
	rd.xy = rot2(time * 0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.11 + time * 0.12, vec3(0.58, 0.59, 0.45), vec3(0.46, 0.37, 0.41), vec3(1.22, 0.96, 1.34), vec3(0.06, 0.25, 0.70)) * fog;
	col += vec3(0.81, 0.64, 0.32) * (it / 70.0) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
