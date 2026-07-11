uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.44;
	float g = dot(sin(q * 2.60), cos(q.zxy * 2.60));
	return (abs(g) - 0.72) / (2.60 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.70);
	vec3 rd = normalize(vec3(p, 1.73));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.13 + time * 0.38, vec3(0.52, 0.46, 0.45), vec3(0.39, 0.39, 0.39), vec3(1.17, 0.96, 1.38), vec3(0.48, 0.42, 0.81)) * fog;
	col += vec3(0.59, 0.71, 0.25) * (it / 63.0) * 0.97;
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
