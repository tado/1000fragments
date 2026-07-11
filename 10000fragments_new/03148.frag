uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	float g = dot(sin(q * 1.81), cos(q.zxy * 1.81));
	return (abs(g) - 0.66) / (1.81 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.97);
	vec3 rd = normalize(vec3(p, 1.01));
	rd.xy = rot2(time * -0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.12 + time * 0.01, vec3(0.52, 0.52, 0.41), vec3(0.40, 0.49, 0.37), vec3(0.79, 1.36, 0.97), vec3(0.32, 0.30, 0.57)) * fog;
	col += vec3(0.91, 0.45, 0.89) * (it / 54.0) * 0.99;
	col *= 0.84 + 0.10 * sin(gl_FragCoord.y * 1.17 + time * 6.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
