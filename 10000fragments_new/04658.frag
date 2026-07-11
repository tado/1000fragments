uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.76;
	vec3 mq = mod(q, 2.46) - 1.23;
	return length(mq) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.23, 1.23, -3.0);
	vec3 rd = normalize(vec3(p, 1.59));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.17 + time * 0.27, vec3(0.41, 0.53, 0.51), vec3(0.48, 0.39, 0.33), vec3(1.24, 1.07, 1.10), vec3(0.17, 0.06, 0.28)) * fog;
	col += vec3(0.41, 0.40, 0.57) * (it / 72.0) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
