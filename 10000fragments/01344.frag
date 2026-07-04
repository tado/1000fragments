uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.70;
	float g = dot(sin(q * 1.89), cos(q.zxy * 1.89));
	return (abs(g) - 0.70) / (1.89 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.54);
	vec3 rd = normalize(vec3(p, 1.62));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.22 + time * 0.04, vec3(0.53, 0.52, 0.40), vec3(0.45, 0.39, 0.31), vec3(1.36, 0.97, 1.00), vec3(0.87, 0.06, 0.17)) * fog;
	col += vec3(0.72, 0.39, 0.35) * (it / 59.0) * 0.89;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
