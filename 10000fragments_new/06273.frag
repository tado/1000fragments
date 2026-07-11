uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.13;
	vec3 mq = mod(q, 1.85) - 0.92;
	return length(mq) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.92, 0.92, -3.0);
	vec3 rd = normalize(vec3(p, 1.22));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.23 + time * 0.33, vec3(0.51, 0.56, 0.50), vec3(0.36, 0.42, 0.33), vec3(1.07, 1.29, 0.74), vec3(0.60, 0.46, 0.99)) * fog;
	col += vec3(0.26, 0.66, 0.56) * (it / 49.0) * 0.64;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
