uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.82;
	float g = dot(sin(q * 3.21), cos(q.zxy * 3.21));
	return (abs(g) - 0.76) / (3.21 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.92);
	vec3 rd = normalize(vec3(p, 1.46));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.38 + time * 0.13, vec3(0.54, 0.45, 0.48), vec3(0.41, 0.48, 0.41), vec3(0.85, 1.31, 0.93), vec3(0.24, 0.31, 0.59)) * fog;
	col += vec3(0.75, 0.27, 0.46) * (it / 56.0) * 0.75;
	col = clamp((col - 0.5) * 1.40 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
