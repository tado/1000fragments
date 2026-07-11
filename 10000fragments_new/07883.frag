uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.25;
	vec3 mq = mod(q, 2.60) - 1.30;
	return length(mq) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.30, 1.30, -3.0);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.38 + time * 0.19, vec3(0.44, 0.50, 0.46), vec3(0.46, 0.34, 0.37), vec3(1.01, 1.40, 1.37), vec3(0.16, 0.50, 0.68)) * fog;
	col += vec3(0.34, 0.20, 0.52) * (it / 72.0) * 0.49;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
