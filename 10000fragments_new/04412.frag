uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.66;
	float g = dot(sin(q * 3.68), cos(q.zxy * 3.68));
	return (abs(g) - 0.29) / (3.68 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.81);
	vec3 rd = normalize(vec3(p, 0.90));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.38 + time * 0.14, vec3(0.58, 0.40, 0.54), vec3(0.46, 0.46, 0.37), vec3(1.19, 1.29, 1.07), vec3(0.24, 0.55, 0.69)) * fog;
	col += vec3(0.41, 0.55, 0.78) * (it / 71.0) * 0.90;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
