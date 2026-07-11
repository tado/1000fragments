uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.75;
	float g = dot(sin(q * 2.70), cos(q.zxy * 2.70));
	return (abs(g) - 0.45) / (2.70 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.64);
	vec3 rd = normalize(vec3(p, 1.05));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.25 + time * 0.35, vec3(0.43, 0.55, 0.48), vec3(0.32, 0.40, 0.33), vec3(0.80, 0.84, 0.89), vec3(0.81, 0.93, 0.92)) * fog;
	col += vec3(0.37, 0.46, 0.56) * (it / 62.0) * 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
