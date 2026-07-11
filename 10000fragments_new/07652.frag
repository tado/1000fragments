uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.66;
	vec3 mq = mod(q, 2.02) - 1.01;
	return length(mq) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.31));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.18 + time * 0.22, vec3(0.57, 0.54, 0.45), vec3(0.32, 0.32, 0.33), vec3(1.13, 1.00, 1.19), vec3(0.10, 0.66, 0.32)) * fog;
	col += vec3(0.52, 0.35, 0.36) * (it / 57.0) * 0.44;
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
