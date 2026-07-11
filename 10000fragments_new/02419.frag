uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.79;
	float g = dot(sin(q * 2.25), cos(q.zxy * 2.25));
	return (abs(g) - 0.26) / (2.25 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.26));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.19 + time * 0.08, vec3(0.44, 0.47, 0.49), vec3(0.34, 0.48, 0.40), vec3(1.32, 1.30, 1.39), vec3(0.10, 0.56, 0.45)) * fog;
	col += vec3(0.40, 0.36, 0.86) * (it / 60.0) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
