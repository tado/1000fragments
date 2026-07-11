uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.20;
	vec3 mq = mod(q, 2.20) - 1.10;
	return length(mq) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.10, 1.10, -3.0);
	vec3 rd = normalize(vec3(p, 1.30));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.33 + time * 0.34, vec3(0.48, 0.40, 0.42), vec3(0.33, 0.32, 0.38), vec3(0.76, 0.89, 1.37), vec3(0.00, 0.89, 0.36)) * fog;
	col += vec3(0.35, 0.60, 0.70) * (it / 49.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
