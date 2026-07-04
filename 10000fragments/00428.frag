uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.76;
	float g = dot(sin(q * 3.49), cos(q.zxy * 3.49));
	return (abs(g) - 0.48) / (3.49 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.33);
	vec3 rd = normalize(vec3(p, 1.12));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.27 + time * 0.39, vec3(0.42, 0.57, 0.57), vec3(0.41, 0.33, 0.45), vec3(1.36, 1.29, 1.14), vec3(0.62, 0.02, 0.79)) * fog;
	col += vec3(0.66, 0.54, 0.61) * (it / 49.0) * 0.41;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
