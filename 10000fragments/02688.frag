uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.58;
	vec3 mq = mod(q, 2.04) - 1.02;
	return length(mq) - 0.47;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.02, 1.02, -3.0);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.37 + time * 0.21, vec3(0.44, 0.51, 0.59), vec3(0.37, 0.45, 0.30), vec3(1.09, 0.92, 1.16), vec3(0.24, 0.30, 0.51)) * fog;
	col += vec3(0.91, 0.22, 0.88) * (it / 57.0) * 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
