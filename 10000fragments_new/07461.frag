uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.93;
	float g = dot(sin(q * 2.32), cos(q.zxy * 2.32));
	return (abs(g) - 0.48) / (2.32 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.40);
	vec3 rd = normalize(vec3(p, 1.26));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.31 + time * 0.04, vec3(0.41, 0.54, 0.45), vec3(0.50, 0.44, 0.31), vec3(1.17, 0.93, 0.85), vec3(0.27, 0.48, 0.89)) * fog;
	col += vec3(0.50, 0.30, 0.67) * (it / 68.0) * 0.85;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
