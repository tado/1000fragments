uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.68;
	float g = dot(sin(q * 3.63), cos(q.zxy * 3.63));
	return (abs(g) - 0.24) / (3.63 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.70);
	vec3 rd = normalize(vec3(p, 1.01));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.12 + time * 0.34, vec3(0.45, 0.49, 0.49), vec3(0.39, 0.37, 0.33), vec3(0.92, 1.29, 0.81), vec3(0.77, 0.44, 0.31)) * fog;
	col += vec3(0.28, 0.35, 0.90) * (it / 50.0) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
