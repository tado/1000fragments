uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.28;
	float g = dot(sin(q * 2.38), cos(q.zxy * 2.38));
	return (abs(g) - 0.65) / (2.38 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.15);
	vec3 rd = normalize(vec3(p, 1.36));
	rd.xy = rot2(time * -0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.15 + time * 0.19, vec3(0.43, 0.54, 0.56), vec3(0.50, 0.38, 0.47), vec3(0.87, 0.72, 1.04), vec3(0.64, 0.31, 0.91)) * fog;
	col += vec3(0.58, 0.23, 0.94) * (it / 72.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
