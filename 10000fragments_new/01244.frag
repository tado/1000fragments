uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.20;
	float g = dot(sin(q * 3.10), cos(q.zxy * 3.10));
	return (abs(g) - 0.50) / (3.10 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.34);
	vec3 rd = normalize(vec3(p, 1.65));
	rd.xy = rot2(time * 0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.21 + time * 0.27, vec3(0.56, 0.46, 0.59), vec3(0.44, 0.45, 0.39), vec3(0.72, 1.24, 1.21), vec3(0.28, 0.89, 0.86)) * fog;
	col += vec3(0.97, 0.43, 0.81) * (it / 69.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
