uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.70;
	float g = dot(sin(q * 2.83), cos(q.zxy * 2.83));
	return (abs(g) - 0.65) / (2.83 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.65);
	vec3 rd = normalize(vec3(p, 1.47));
	rd.xy = rot2(time * -0.28) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.11 + time * 0.21, vec3(0.57, 0.48, 0.45), vec3(0.47, 0.32, 0.46), vec3(1.33, 0.70, 1.19), vec3(0.71, 0.81, 0.41)) * fog;
	col += vec3(0.50, 1.00, 0.97) * (it / 72.0) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
