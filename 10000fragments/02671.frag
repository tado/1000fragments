uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.10;
	vec3 mq = mod(q, 2.08) - 1.04;
	return length(mq) - 0.50;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.04, 1.04, -3.0);
	vec3 rd = normalize(vec3(p, 1.27));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.37 + time * 0.03, vec3(0.44, 0.43, 0.52), vec3(0.34, 0.30, 0.41), vec3(1.15, 1.12, 1.36), vec3(0.51, 0.42, 0.83)) * fog;
	col += vec3(0.41, 0.50, 0.95) * (it / 49.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
