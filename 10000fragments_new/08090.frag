uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.59;
	float g = dot(sin(q * 3.53), cos(q.zxy * 3.53));
	return (abs(g) - 0.46) / (3.53 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.23);
	vec3 rd = normalize(vec3(p, 1.78));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.38 + time * 0.33, vec3(0.42, 0.54, 0.55), vec3(0.39, 0.39, 0.44), vec3(1.12, 1.17, 1.36), vec3(0.98, 0.47, 0.58)) * fog;
	col += vec3(0.93, 0.93, 0.28) * (it / 49.0) * 0.33;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
