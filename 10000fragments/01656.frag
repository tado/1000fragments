uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.66;
	vec2 g = mod(vec2(q.x, q.z), 2.01) - 1.01;
	float d = length(g) - (0.19 + 0.06 * sin(q.y * 3.72 + time * 2.26));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.16 + time * 0.31, vec3(0.52, 0.42, 0.42), vec3(0.41, 0.43, 0.35), vec3(0.76, 1.10, 1.01), vec3(0.29, 0.50, 0.56)) * fog;
	col += vec3(0.44, 0.52, 0.61) * (it / 63.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
