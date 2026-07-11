uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.14;
	float g = dot(sin(q * 2.03), cos(q.zxy * 2.03));
	return (abs(g) - 0.76) / (2.03 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.58);
	vec3 rd = normalize(vec3(p, 1.51));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.37 + time * 0.12, vec3(0.45, 0.53, 0.58), vec3(0.34, 0.38, 0.40), vec3(0.94, 0.94, 0.79), vec3(0.69, 0.47, 0.05)) * fog;
	col += vec3(0.89, 0.92, 0.82) * (it / 63.0) * 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
