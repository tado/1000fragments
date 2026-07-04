uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.54;
	float g = dot(sin(q * 2.50), cos(q.zxy * 2.50));
	return (abs(g) - 0.45) / (2.50 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.50);
	vec3 rd = normalize(vec3(p, 1.64));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.30 + time * 0.01, vec3(0.53, 0.42, 0.46), vec3(0.45, 0.36, 0.34), vec3(1.29, 1.24, 0.81), vec3(0.51, 0.59, 0.72)) * fog;
	col += vec3(0.39, 0.93, 0.71) * (it / 58.0) * 0.44;
	col = mod(col * 1.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
