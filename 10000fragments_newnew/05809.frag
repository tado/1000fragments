uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.96;
	float g = dot(sin(q * 3.91), cos(q.zxy * 3.91));
	return (abs(g) - 0.44) / (3.91 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.86);
	vec3 rd = normalize(vec3(p, 1.36));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.25 + time * 0.40, vec3(0.49, 0.48, 0.42), vec3(0.40, 0.47, 0.43), vec3(0.73, 0.84, 1.21), vec3(0.51, 0.16, 0.65)) * fog;
	col += vec3(0.66, 0.80, 0.75) * (it / 49.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
