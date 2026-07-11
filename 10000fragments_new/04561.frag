uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.18;
	float g = dot(sin(q * 1.72), cos(q.zxy * 1.72));
	return (abs(g) - 0.52) / (1.72 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.08);
	vec3 rd = normalize(vec3(p, 1.70));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.23 + time * 0.24, vec3(0.50, 0.52, 0.52), vec3(0.47, 0.33, 0.35), vec3(1.06, 0.92, 0.72), vec3(0.35, 0.06, 0.32)) * fog;
	col += vec3(0.27, 0.91, 0.91) * (it / 63.0) * 0.67;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
