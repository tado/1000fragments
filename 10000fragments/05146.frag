uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.85;
	float g = dot(sin(q * 1.93), cos(q.zxy * 1.93));
	return (abs(g) - 0.77) / (1.93 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.01);
	vec3 rd = normalize(vec3(p, 1.17));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.25 + time * 0.18, vec3(0.50, 0.53, 0.44), vec3(0.33, 0.38, 0.32), vec3(0.74, 1.27, 0.89), vec3(0.85, 0.91, 0.93)) * fog;
	col += vec3(0.48, 0.84, 0.52) * (it / 58.0) * 0.50;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
