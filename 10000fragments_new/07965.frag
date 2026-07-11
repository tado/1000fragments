uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.79;
	float g = dot(sin(q * 1.62), cos(q.zxy * 1.62));
	return (abs(g) - 0.62) / (1.62 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.63);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.38 + time * 0.35, vec3(0.42, 0.59, 0.42), vec3(0.44, 0.45, 0.40), vec3(0.81, 1.14, 0.78), vec3(0.22, 0.94, 0.32)) * fog;
	col += vec3(0.87, 0.45, 0.39) * (it / 51.0) * 0.53;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
