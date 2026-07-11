uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.56;
	float g = dot(sin(q * 2.75), cos(q.zxy * 2.75));
	return (abs(g) - 0.44) / (2.75 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.66);
	vec3 rd = normalize(vec3(p, 1.64));
	rd.xy = rot2(time * -0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.25 + time * 0.10, vec3(0.55, 0.41, 0.41), vec3(0.35, 0.49, 0.38), vec3(1.23, 0.72, 1.26), vec3(0.36, 0.13, 0.09)) * fog;
	col += vec3(0.63, 0.71, 0.80) * (it / 58.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
