uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.49;
	vec3 mq = mod(q, 2.19) - 1.09;
	return length(mq) - 0.46;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.11));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.19 + time * 0.17, vec3(0.54, 0.41, 0.49), vec3(0.45, 0.40, 0.44), vec3(1.06, 0.91, 0.87), vec3(0.96, 0.02, 0.42)) * fog;
	col += vec3(0.66, 0.50, 0.29) * (it / 56.0) * 0.33;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
