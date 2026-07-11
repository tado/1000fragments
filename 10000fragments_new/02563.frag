uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.24;
	float g = dot(sin(q * 2.87), cos(q.zxy * 2.87));
	return (abs(g) - 0.41) / (2.87 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.11);
	vec3 rd = normalize(vec3(p, 1.66));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.37 + time * 0.36, vec3(0.42, 0.58, 0.44), vec3(0.39, 0.45, 0.48), vec3(1.13, 1.14, 1.27), vec3(0.36, 0.97, 0.65)) * fog;
	col += vec3(0.42, 0.28, 0.56) * (it / 62.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
