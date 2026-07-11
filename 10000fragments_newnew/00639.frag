uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.30;
	float g = dot(sin(q * 2.03), cos(q.zxy * 2.03));
	return (abs(g) - 0.77) / (2.03 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.84);
	vec3 rd = normalize(vec3(p, 0.99));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.36 + time * 0.16, vec3(0.42, 0.56, 0.43), vec3(0.40, 0.39, 0.47), vec3(0.81, 0.77, 1.24), vec3(0.61, 0.09, 0.87)) * fog;
	col += vec3(0.25, 0.68, 0.76) * (it / 70.0) * 0.63;
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
