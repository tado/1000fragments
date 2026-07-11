uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.75;
	float g = dot(sin(q * 1.68), cos(q.zxy * 1.68));
	return (abs(g) - 0.77) / (1.68 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.15);
	vec3 rd = normalize(vec3(p, 1.08));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.37 + time * 0.05, vec3(0.47, 0.54, 0.41), vec3(0.30, 0.33, 0.49), vec3(0.85, 0.89, 0.92), vec3(0.51, 0.33, 0.25)) * fog;
	col += vec3(0.27, 0.49, 0.57) * (it / 64.0) * 0.61;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
