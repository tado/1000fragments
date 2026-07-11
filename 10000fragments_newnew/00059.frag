uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.53;
	float g = dot(sin(q * 1.81), cos(q.zxy * 1.81));
	return (abs(g) - 0.53) / (1.81 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.30);
	vec3 rd = normalize(vec3(p, 0.96));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.22 + time * 0.07, vec3(0.46, 0.46, 0.50), vec3(0.36, 0.44, 0.43), vec3(1.02, 0.85, 1.36), vec3(0.33, 0.53, 0.13)) * fog;
	col += vec3(0.79, 0.77, 0.62) * (it / 61.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
