uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.45;
	vec3 mq = mod(q, 2.53) - 1.26;
	return length(mq) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.26, 1.26, -3.0);
	vec3 rd = normalize(vec3(p, 1.45));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.17 + time * 0.13, vec3(0.60, 0.40, 0.47), vec3(0.32, 0.39, 0.31), vec3(0.87, 1.21, 1.16), vec3(0.33, 0.84, 0.25)) * fog;
	col += vec3(0.80, 0.45, 0.34) * (it / 65.0) * 0.84;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
