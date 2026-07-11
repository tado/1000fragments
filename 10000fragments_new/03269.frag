uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.15;
	float g = dot(sin(q * 3.53), cos(q.zxy * 3.53));
	return (abs(g) - 0.36) / (3.53 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.22);
	vec3 rd = normalize(vec3(p, 1.40));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.33 + time * 0.03, vec3(0.44, 0.55, 0.41), vec3(0.50, 0.49, 0.41), vec3(1.32, 0.76, 0.77), vec3(0.02, 0.43, 0.68)) * fog;
	col += vec3(0.57, 0.65, 0.28) * (it / 50.0) * 0.81;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
