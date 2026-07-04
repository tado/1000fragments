uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.56;
	float g = dot(sin(q * 2.82), cos(q.zxy * 2.82));
	return (abs(g) - 0.40) / (2.82 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.22);
	vec3 rd = normalize(vec3(p, 1.18));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.23 + time * 0.04, vec3(0.47, 0.57, 0.50), vec3(0.34, 0.33, 0.44), vec3(0.89, 1.07, 0.85), vec3(0.86, 0.78, 0.39)) * fog;
	col += vec3(0.58, 0.56, 0.67) * (it / 69.0) * 0.46;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
