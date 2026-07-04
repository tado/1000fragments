uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.41;
	float g = dot(sin(q * 2.82), cos(q.zxy * 2.82));
	return (abs(g) - 0.26) / (2.82 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.11);
	vec3 rd = normalize(vec3(p, 1.50));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.31 + time * 0.25, vec3(0.45, 0.50, 0.52), vec3(0.45, 0.39, 0.35), vec3(1.16, 1.17, 0.90), vec3(0.63, 0.40, 0.08)) * fog;
	col += vec3(0.78, 0.82, 0.47) * (it / 55.0) * 0.99;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
