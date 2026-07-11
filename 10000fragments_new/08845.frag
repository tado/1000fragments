uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.26;
	float g = dot(sin(q * 3.63), cos(q.zxy * 3.63));
	return (abs(g) - 0.74) / (3.63 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.87);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.12 + time * 0.23, vec3(0.52, 0.49, 0.44), vec3(0.36, 0.48, 0.37), vec3(0.80, 1.16, 1.19), vec3(0.20, 0.78, 0.20)) * fog;
	col += vec3(0.64, 0.93, 0.47) * (it / 61.0) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
