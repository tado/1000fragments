uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.84;
	float g = dot(sin(q * 2.21), cos(q.zxy * 2.21));
	return (abs(g) - 0.38) / (2.21 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.52);
	vec3 rd = normalize(vec3(p, 1.70));
	rd.xy = rot2(time * -0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.19 + time * 0.10, vec3(0.56, 0.59, 0.50), vec3(0.39, 0.47, 0.38), vec3(1.15, 1.33, 1.01), vec3(0.30, 0.44, 0.05)) * fog;
	col += vec3(0.37, 0.64, 0.75) * (it / 55.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
