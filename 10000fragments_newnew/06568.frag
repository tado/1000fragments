uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.52;
	float g = dot(sin(q * 2.91), cos(q.zxy * 2.91));
	return (abs(g) - 0.55) / (2.91 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.18);
	vec3 rd = normalize(vec3(p, 0.90));
	rd.xy = rot2(time * 0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.23 + time * 0.26, vec3(0.54, 0.47, 0.40), vec3(0.45, 0.38, 0.45), vec3(1.27, 0.89, 1.05), vec3(0.13, 0.68, 0.35)) * fog;
	col += vec3(0.93, 0.40, 0.78) * (it / 65.0) * 0.75;
	col = fract(col * 1.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
