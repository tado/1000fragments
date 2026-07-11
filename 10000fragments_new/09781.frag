uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.59;
	vec3 mq = mod(q, 2.47) - 1.23;
	return length(mq) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.23, 1.23, -3.0);
	vec3 rd = normalize(vec3(p, 0.99));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.39 + time * 0.29, vec3(0.59, 0.57, 0.42), vec3(0.48, 0.46, 0.31), vec3(1.22, 0.99, 1.16), vec3(0.22, 0.32, 0.79)) * fog;
	col += vec3(0.27, 0.36, 0.58) * (it / 70.0) * 0.65;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
