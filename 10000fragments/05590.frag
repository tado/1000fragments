uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.59;
	float g = dot(sin(q * 2.07), cos(q.zxy * 2.07));
	return (abs(g) - 0.51) / (2.07 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.79);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.34 + time * 0.33, vec3(0.43, 0.46, 0.57), vec3(0.39, 0.42, 0.44), vec3(1.25, 0.95, 1.28), vec3(0.97, 0.08, 0.39)) * fog;
	col += vec3(0.62, 0.62, 0.30) * (it / 56.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
