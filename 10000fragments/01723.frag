uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.37;
	float g = dot(sin(q * 3.89), cos(q.zxy * 3.89));
	return (abs(g) - 0.24) / (3.89 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.69);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.21 + time * 0.17, vec3(0.54, 0.41, 0.52), vec3(0.49, 0.43, 0.43), vec3(1.13, 1.12, 1.39), vec3(0.11, 0.69, 0.29)) * fog;
	col += vec3(0.31, 0.55, 0.94) * (it / 72.0) * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
