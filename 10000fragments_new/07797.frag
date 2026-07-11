uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	float g = dot(sin(q * 2.30), cos(q.zxy * 2.30));
	return (abs(g) - 0.47) / (2.30 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.65);
	vec3 rd = normalize(vec3(p, 1.08));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.37 + time * 0.08, vec3(0.50, 0.41, 0.45), vec3(0.35, 0.36, 0.48), vec3(1.12, 1.40, 0.71), vec3(0.54, 0.53, 0.33)) * fog;
	col += vec3(0.47, 0.79, 0.56) * (it / 57.0) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
