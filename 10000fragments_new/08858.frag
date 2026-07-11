uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.57;
	vec3 mq = mod(q, 2.23) - 1.12;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 1.63));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.27 + time * 0.11, vec3(0.58, 0.56, 0.43), vec3(0.50, 0.43, 0.33), vec3(0.94, 1.23, 0.74), vec3(0.67, 0.80, 0.72)) * fog;
	col += vec3(0.29, 0.70, 0.58) * (it / 56.0) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
