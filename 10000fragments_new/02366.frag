uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.63;
	float g = dot(sin(q * 3.68), cos(q.zxy * 3.68));
	return (abs(g) - 0.40) / (3.68 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.84);
	vec3 rd = normalize(vec3(p, 1.63));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.20 + time * 0.39, vec3(0.47, 0.48, 0.53), vec3(0.32, 0.50, 0.46), vec3(1.19, 0.87, 0.73), vec3(0.69, 0.33, 0.08)) * fog;
	col += vec3(0.59, 0.47, 0.61) * (it / 68.0) * 0.91;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
