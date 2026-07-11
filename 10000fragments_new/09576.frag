uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.94;
	vec3 mq = mod(q, 2.46) - 1.23;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.23, 1.23, -3.0);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.24 + time * 0.24, vec3(0.57, 0.59, 0.43), vec3(0.44, 0.44, 0.48), vec3(1.13, 0.73, 1.36), vec3(0.08, 0.41, 0.47)) * fog;
	col += vec3(0.53, 0.64, 0.71) * (it / 50.0) * 0.99;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
