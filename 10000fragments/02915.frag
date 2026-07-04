uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.96;
	vec3 mq = mod(q, 2.29) - 1.14;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.14, 1.14, -3.0);
	vec3 rd = normalize(vec3(p, 1.40));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.20 + time * 0.05, vec3(0.44, 0.55, 0.46), vec3(0.46, 0.47, 0.33), vec3(0.71, 1.18, 1.19), vec3(0.33, 0.07, 0.98)) * fog;
	col += vec3(0.22, 0.56, 0.29) * (it / 67.0) * 0.97;
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
