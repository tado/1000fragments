uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.11;
	vec3 mq = mod(q, 2.27) - 1.14;
	return length(mq) - 0.46;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.14, 1.14, -3.0);
	vec3 rd = normalize(vec3(p, 1.39));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.14 + time * 0.21, vec3(0.57, 0.42, 0.60), vec3(0.36, 0.34, 0.41), vec3(0.80, 0.71, 0.72), vec3(0.14, 0.35, 0.38)) * fog;
	col += vec3(0.72, 0.22, 0.28) * (it / 63.0) * 0.48;
	col = mod(col * 2.61, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
