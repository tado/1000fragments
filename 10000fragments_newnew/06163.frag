uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.59;
	float g = dot(sin(q * 2.83), cos(q.zxy * 2.83));
	return (abs(g) - 0.60) / (2.83 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.92);
	vec3 rd = normalize(vec3(p, 1.01));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.10 + time * 0.34, vec3(0.41, 0.45, 0.46), vec3(0.36, 0.44, 0.34), vec3(1.35, 1.04, 1.14), vec3(0.80, 0.40, 0.53)) * fog;
	col += vec3(0.79, 0.83, 0.91) * (it / 72.0) * 0.75;
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.77 + time * 12.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
