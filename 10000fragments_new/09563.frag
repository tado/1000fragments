uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.87;
	vec3 mq = mod(q, 2.49) - 1.25;
	return length(mq) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 0.93));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.18 + time * 0.25, vec3(0.49, 0.45, 0.44), vec3(0.32, 0.40, 0.43), vec3(1.09, 1.21, 1.17), vec3(0.28, 0.71, 0.85)) * fog;
	col += vec3(0.25, 0.78, 0.73) * (it / 60.0) * 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
