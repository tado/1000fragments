uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.46;
	vec3 mq = mod(q, 1.80) - 0.90;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.90, 0.90, -3.0);
	vec3 rd = normalize(vec3(p, 1.45));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.23 + time * 0.37, vec3(0.53, 0.45, 0.43), vec3(0.37, 0.41, 0.47), vec3(1.04, 1.11, 1.15), vec3(0.61, 0.03, 0.31)) * fog;
	col += vec3(0.74, 0.25, 0.27) * (it / 57.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
