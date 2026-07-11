uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.95;
	float g = dot(sin(q * 2.33), cos(q.zxy * 2.33));
	return (abs(g) - 0.64) / (2.33 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.14);
	vec3 rd = normalize(vec3(p, 1.57));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.15 + time * 0.20, vec3(0.50, 0.45, 0.57), vec3(0.44, 0.47, 0.36), vec3(0.90, 1.30, 0.96), vec3(0.70, 0.44, 0.32)) * fog;
	col += vec3(0.75, 0.25, 0.58) * (it / 57.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
