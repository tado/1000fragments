uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.44;
	vec3 mq = mod(q, 2.48) - 1.24;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.24, 1.24, -3.0);
	vec3 rd = normalize(vec3(p, 1.51));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.34 + time * 0.34, vec3(0.48, 0.59, 0.41), vec3(0.32, 0.43, 0.31), vec3(1.22, 1.26, 1.24), vec3(0.44, 0.62, 0.57)) * fog;
	col += vec3(0.20, 0.58, 0.78) * (it / 58.0) * 0.98;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
