uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.75;
	float g = dot(sin(q * 2.59), cos(q.zxy * 2.59));
	return (abs(g) - 0.30) / (2.59 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.21);
	vec3 rd = normalize(vec3(p, 1.61));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.21 + time * 0.37, vec3(0.57, 0.49, 0.49), vec3(0.48, 0.46, 0.44), vec3(1.04, 0.82, 1.40), vec3(0.16, 0.10, 0.21)) * fog;
	col += vec3(0.82, 0.84, 0.35) * (it / 55.0) * 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
