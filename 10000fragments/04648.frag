uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.97;
	float g = dot(sin(q * 3.61), cos(q.zxy * 3.61));
	return (abs(g) - 0.38) / (3.61 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.22);
	vec3 rd = normalize(vec3(p, 1.34));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.25 + time * 0.16, vec3(0.41, 0.60, 0.50), vec3(0.47, 0.49, 0.39), vec3(1.12, 1.19, 0.94), vec3(0.95, 0.80, 0.56)) * fog;
	col += vec3(0.53, 0.24, 0.48) * (it / 58.0) * 0.69;
	col *= 0.88 + 0.14 * sin(gl_FragCoord.y * 1.70 + time * 4.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
