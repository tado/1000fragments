uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.64;
	float g = dot(sin(q * 3.44), cos(q.zxy * 3.44));
	return (abs(g) - 0.67) / (3.44 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.74);
	vec3 rd = normalize(vec3(p, 1.06));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.22 + time * 0.32, vec3(0.59, 0.59, 0.46), vec3(0.37, 0.35, 0.38), vec3(0.82, 0.78, 1.26), vec3(0.10, 0.34, 0.65)) * fog;
	col += vec3(0.42, 0.37, 0.40) * (it / 58.0) * 0.96;
	col *= 0.80 + 0.20 * sin(gl_FragCoord.y * 2.63 + time * 9.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
