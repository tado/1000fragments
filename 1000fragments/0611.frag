uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.66;
	float g = dot(sin(q * 3.32), cos(q.zxy * 3.32));
	return (abs(g) - 0.67) / (3.32 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.49);
	vec3 rd = normalize(vec3(p, 1.76));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.30 + time * 0.19, vec3(0.52, 0.58, 0.54), vec3(0.31, 0.33, 0.31), vec3(1.08, 0.85, 0.71), vec3(0.08, 0.66, 0.28)) * fog;
	col += vec3(0.36, 0.40, 0.82) * (it / 70.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
