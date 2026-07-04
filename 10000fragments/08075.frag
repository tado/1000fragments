uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.18;
	vec3 mq = mod(q, 1.97) - 0.99;
	return length(mq) - 0.26;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.99, 0.99, -3.0);
	vec3 rd = normalize(vec3(p, 1.56));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.15 + time * 0.26, vec3(0.58, 0.53, 0.51), vec3(0.48, 0.45, 0.49), vec3(0.96, 1.12, 1.39), vec3(0.00, 0.60, 0.42)) * fog;
	col += vec3(0.60, 0.54, 0.44) * (it / 62.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
