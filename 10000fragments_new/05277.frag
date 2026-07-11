uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.84;
	float g = dot(sin(q * 3.42), cos(q.zxy * 3.42));
	return (abs(g) - 0.66) / (3.42 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.20);
	vec3 rd = normalize(vec3(p, 1.14));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.21 + time * 0.28, vec3(0.43, 0.49, 0.57), vec3(0.33, 0.38, 0.50), vec3(0.99, 0.93, 1.22), vec3(0.85, 0.77, 0.91)) * fog;
	col += vec3(0.66, 0.40, 0.54) * (it / 54.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
