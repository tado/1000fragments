uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.75;
	float g = dot(sin(q * 1.75), cos(q.zxy * 1.75));
	return (abs(g) - 0.37) / (1.75 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.62);
	vec3 rd = normalize(vec3(p, 1.55));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.17 + time * 0.12, vec3(0.50, 0.55, 0.58), vec3(0.30, 0.48, 0.40), vec3(1.12, 1.08, 0.79), vec3(0.31, 0.59, 0.53)) * fog;
	col += vec3(0.35, 0.87, 0.50) * (it / 65.0) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
