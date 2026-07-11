uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.11;
	float g = dot(sin(q * 3.88), cos(q.zxy * 3.88));
	return (abs(g) - 0.55) / (3.88 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.04);
	vec3 rd = normalize(vec3(p, 1.68));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.13 + time * 0.28, vec3(0.47, 0.44, 0.47), vec3(0.40, 0.34, 0.34), vec3(1.33, 0.89, 0.77), vec3(0.83, 0.28, 0.80)) * fog;
	col += vec3(0.97, 0.92, 0.21) * (it / 62.0) * 0.88;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
