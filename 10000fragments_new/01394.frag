uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.33;
	vec3 mq = mod(q, 2.55) - 1.27;
	return length(mq) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.27, 1.27, -3.0);
	vec3 rd = normalize(vec3(p, 1.36));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.32 + time * 0.23, vec3(0.58, 0.58, 0.46), vec3(0.34, 0.34, 0.36), vec3(1.40, 1.14, 0.90), vec3(0.90, 0.15, 0.05)) * fog;
	col += vec3(0.36, 0.29, 0.46) * (it / 52.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
