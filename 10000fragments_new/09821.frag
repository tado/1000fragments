uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.73;
	float g = dot(sin(q * 2.33), cos(q.zxy * 2.33));
	return (abs(g) - 0.35) / (2.33 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.13);
	vec3 rd = normalize(vec3(p, 1.53));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.12 + time * 0.27, vec3(0.54, 0.44, 0.56), vec3(0.49, 0.39, 0.44), vec3(1.28, 0.96, 0.90), vec3(0.63, 0.51, 0.11)) * fog;
	col += vec3(0.92, 0.83, 0.62) * (it / 57.0) * 0.75;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
