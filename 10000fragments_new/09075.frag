uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.01;
	float g = dot(sin(q * 2.83), cos(q.zxy * 2.83));
	return (abs(g) - 0.33) / (2.83 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.64);
	vec3 rd = normalize(vec3(p, 1.72));
	rd.xy = rot2(time * -0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.39 + time * 0.11, vec3(0.58, 0.54, 0.52), vec3(0.50, 0.43, 0.39), vec3(1.13, 1.24, 0.96), vec3(0.88, 0.11, 0.36)) * fog;
	col += vec3(0.56, 0.91, 0.50) * (it / 58.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
