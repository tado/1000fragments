uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.33;
	float g = dot(sin(q * 3.20), cos(q.zxy * 3.20));
	return (abs(g) - 0.40) / (3.20 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.02);
	vec3 rd = normalize(vec3(p, 1.20));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.16 + time * 0.11, vec3(0.58, 0.50, 0.58), vec3(0.32, 0.45, 0.49), vec3(1.24, 0.96, 1.13), vec3(0.97, 0.12, 0.87)) * fog;
	col += vec3(0.38, 0.25, 0.91) * (it / 54.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
