uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.92;
	float g = dot(sin(q * 1.55), cos(q.zxy * 1.55));
	return (abs(g) - 0.49) / (1.55 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.84);
	vec3 rd = normalize(vec3(p, 1.23));
	rd.xy = rot2(time * -0.07) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.22 + time * 0.21, vec3(0.53, 0.41, 0.54), vec3(0.45, 0.40, 0.34), vec3(1.08, 0.72, 0.74), vec3(0.89, 0.89, 0.86)) * fog;
	col += vec3(0.76, 0.40, 0.72) * (it / 63.0) * 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
