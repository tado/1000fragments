uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.47;
	float g = dot(sin(q * 2.43), cos(q.zxy * 2.43));
	return (abs(g) - 0.78) / (2.43 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.83);
	vec3 rd = normalize(vec3(p, 1.71));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.22 + time * 0.18, vec3(0.58, 0.46, 0.55), vec3(0.39, 0.41, 0.30), vec3(1.29, 1.03, 1.23), vec3(0.98, 0.22, 0.03)) * fog;
	col += vec3(0.74, 0.63, 0.97) * (it / 60.0) * 0.48;
	col = mod(col * 2.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
