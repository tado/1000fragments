uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.78;
	float g = dot(sin(q * 3.18), cos(q.zxy * 3.18));
	return (abs(g) - 0.76) / (3.18 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.57));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.22 + time * 0.09, vec3(0.58, 0.41, 0.50), vec3(0.48, 0.37, 0.31), vec3(1.14, 1.03, 0.96), vec3(0.01, 0.90, 0.36)) * fog;
	col += vec3(0.81, 0.43, 0.90) * (it / 69.0) * 0.67;
	col = fract(col * 2.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
