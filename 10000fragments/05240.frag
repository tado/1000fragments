uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.71;
	float g = dot(sin(q * 2.97), cos(q.zxy * 2.97));
	return (abs(g) - 0.48) / (2.97 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.26);
	vec3 rd = normalize(vec3(p, 0.96));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.36 + time * 0.07, vec3(0.42, 0.49, 0.45), vec3(0.43, 0.39, 0.44), vec3(1.04, 1.18, 0.95), vec3(0.54, 0.53, 0.18)) * fog;
	col += vec3(0.91, 0.62, 0.69) * (it / 66.0) * 0.49;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
