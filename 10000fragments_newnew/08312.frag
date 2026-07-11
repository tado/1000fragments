uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.36;
	float g = dot(sin(q * 1.96), cos(q.zxy * 1.96));
	return (abs(g) - 0.49) / (1.96 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.97);
	vec3 rd = normalize(vec3(p, 1.06));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.26 + time * 0.27, vec3(0.41, 0.42, 0.57), vec3(0.38, 0.47, 0.34), vec3(0.88, 0.95, 0.73), vec3(0.44, 0.12, 0.14)) * fog;
	col += vec3(0.42, 0.36, 0.93) * (it / 58.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
