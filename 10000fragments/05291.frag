uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.83;
	float g = dot(sin(q * 1.98), cos(q.zxy * 1.98));
	return (abs(g) - 0.35) / (1.98 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.52);
	vec3 rd = normalize(vec3(p, 1.16));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.39 + time * 0.15, vec3(0.56, 0.47, 0.48), vec3(0.41, 0.35, 0.44), vec3(1.22, 1.36, 1.16), vec3(0.94, 0.87, 0.29)) * fog;
	col += vec3(0.31, 0.67, 0.49) * (it / 58.0) * 0.49;
	col = fract(col * 2.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
