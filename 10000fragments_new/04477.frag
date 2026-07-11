uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.89;
	float g = dot(sin(q * 1.88), cos(q.zxy * 1.88));
	return (abs(g) - 0.25) / (1.88 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.36);
	vec3 rd = normalize(vec3(p, 1.08));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.22 + time * 0.19, vec3(0.51, 0.41, 0.41), vec3(0.31, 0.37, 0.33), vec3(0.73, 1.22, 1.13), vec3(0.15, 0.06, 0.91)) * fog;
	col += vec3(0.29, 0.50, 0.84) * (it / 50.0) * 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
