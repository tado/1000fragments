uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.88;
	float g = dot(sin(q * 2.13), cos(q.zxy * 2.13));
	return (abs(g) - 0.38) / (2.13 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.71);
	vec3 rd = normalize(vec3(p, 1.53));
	rd.xy = rot2(time * -0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.22 + time * 0.09, vec3(0.58, 0.50, 0.60), vec3(0.38, 0.33, 0.46), vec3(0.73, 0.88, 1.17), vec3(0.69, 0.71, 0.46)) * fog;
	col += vec3(0.36, 0.37, 0.83) * (it / 67.0) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
