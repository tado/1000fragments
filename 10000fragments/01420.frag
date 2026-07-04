uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.78;
	float g = dot(sin(q * 1.76), cos(q.zxy * 1.76));
	return (abs(g) - 0.67) / (1.76 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.00);
	vec3 rd = normalize(vec3(p, 1.29));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.23 + time * 0.35, vec3(0.59, 0.46, 0.47), vec3(0.44, 0.41, 0.30), vec3(0.71, 0.75, 0.75), vec3(0.43, 0.51, 0.23)) * fog;
	col += vec3(0.21, 0.57, 0.24) * (it / 60.0) * 0.93;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
