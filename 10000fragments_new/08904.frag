uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.55;
	float g = dot(sin(q * 3.44), cos(q.zxy * 3.44));
	return (abs(g) - 0.36) / (3.44 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.91);
	vec3 rd = normalize(vec3(p, 1.11));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.31 + time * 0.23, vec3(0.53, 0.42, 0.46), vec3(0.46, 0.31, 0.48), vec3(0.80, 1.34, 0.82), vec3(0.59, 0.60, 0.71)) * fog;
	col += vec3(0.58, 0.35, 0.30) * (it / 66.0) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
