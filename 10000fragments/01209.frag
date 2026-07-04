uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.55;
	float g = dot(sin(q * 1.83), cos(q.zxy * 1.83));
	return (abs(g) - 0.51) / (1.83 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.23);
	vec3 rd = normalize(vec3(p, 1.73));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.35 + time * 0.15, vec3(0.55, 0.55, 0.58), vec3(0.39, 0.32, 0.48), vec3(1.15, 0.87, 1.18), vec3(0.62, 0.31, 0.06)) * fog;
	col += vec3(0.22, 0.59, 0.38) * (it / 48.0) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
