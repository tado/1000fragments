uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.68;
	float g = dot(sin(q * 3.58), cos(q.zxy * 3.58));
	return (abs(g) - 0.60) / (3.58 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.93);
	vec3 rd = normalize(vec3(p, 1.03));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.13 + time * 0.14, vec3(0.54, 0.46, 0.44), vec3(0.49, 0.31, 0.47), vec3(0.97, 0.85, 0.96), vec3(0.16, 0.27, 0.29)) * fog;
	col += vec3(0.63, 0.83, 0.48) * (it / 56.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
