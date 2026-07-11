uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.12;
	float g = dot(sin(q * 2.93), cos(q.zxy * 2.93));
	return (abs(g) - 0.48) / (2.93 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.46));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.19 + time * 0.20, vec3(0.55, 0.41, 0.50), vec3(0.45, 0.37, 0.44), vec3(1.38, 0.70, 0.76), vec3(0.30, 0.12, 0.20)) * fog;
	col += vec3(0.88, 0.90, 0.46) * (it / 55.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
