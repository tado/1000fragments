uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.50;
	float g = dot(sin(q * 2.03), cos(q.zxy * 2.03));
	return (abs(g) - 0.66) / (2.03 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.64);
	vec3 rd = normalize(vec3(p, 1.12));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.29 + time * 0.16, vec3(0.60, 0.50, 0.47), vec3(0.35, 0.43, 0.40), vec3(1.39, 0.71, 1.26), vec3(0.70, 0.08, 0.58)) * fog;
	col += vec3(0.88, 0.44, 0.46) * (it / 49.0) * 0.38;
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
