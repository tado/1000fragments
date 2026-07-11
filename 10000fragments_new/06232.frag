uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.12;
	float g = dot(sin(q * 2.31), cos(q.zxy * 2.31));
	return (abs(g) - 0.74) / (2.31 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.17);
	vec3 rd = normalize(vec3(p, 1.25));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.18 + time * 0.29, vec3(0.43, 0.57, 0.51), vec3(0.40, 0.48, 0.45), vec3(1.14, 1.16, 0.98), vec3(0.97, 0.97, 0.10)) * fog;
	col += vec3(0.38, 0.70, 0.30) * (it / 60.0) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
