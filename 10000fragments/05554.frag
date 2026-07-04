uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.58;
	float g = dot(sin(q * 2.73), cos(q.zxy * 2.73));
	return (abs(g) - 0.55) / (2.73 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.18);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.33 + time * 0.13, vec3(0.55, 0.40, 0.45), vec3(0.49, 0.49, 0.44), vec3(0.91, 0.76, 1.28), vec3(0.06, 0.63, 0.76)) * fog;
	col += vec3(0.86, 0.51, 0.40) * (it / 67.0) * 0.64;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
