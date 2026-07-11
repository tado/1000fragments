uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.98;
	float g = dot(sin(q * 3.69), cos(q.zxy * 3.69));
	return (abs(g) - 0.31) / (3.69 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.03);
	vec3 rd = normalize(vec3(p, 1.28));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.33 + time * 0.17, vec3(0.47, 0.49, 0.56), vec3(0.34, 0.40, 0.45), vec3(0.75, 1.03, 1.12), vec3(0.54, 0.04, 0.60)) * fog;
	col += vec3(0.94, 0.82, 0.56) * (it / 65.0) * 0.45;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
