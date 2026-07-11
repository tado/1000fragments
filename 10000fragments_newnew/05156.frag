uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.64;
	vec2 g = mod(vec2(q.x, q.z), 2.32) - 1.16;
	float d = length(g) - (0.17 + 0.05 * sin(q.y * 2.75 + time * 3.81));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 0.97));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.29 + time * 0.11, vec3(0.54, 0.49, 0.55), vec3(0.34, 0.45, 0.39), vec3(1.04, 1.10, 1.25), vec3(0.81, 0.26, 0.01)) * fog;
	col += vec3(0.38, 0.25, 0.60) * (it / 71.0) * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
