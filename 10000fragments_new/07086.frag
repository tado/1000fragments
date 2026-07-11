uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.56;
	float g = dot(sin(q * 1.61), cos(q.zxy * 1.61));
	return (abs(g) - 0.68) / (1.61 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.93);
	vec3 rd = normalize(vec3(p, 1.12));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.25 + time * 0.25, vec3(0.43, 0.58, 0.51), vec3(0.47, 0.44, 0.32), vec3(1.30, 1.29, 1.34), vec3(0.83, 0.98, 0.85)) * fog;
	col += vec3(0.86, 0.90, 0.25) * (it / 70.0) * 0.90;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
