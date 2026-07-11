uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.27;
	vec3 mq = mod(q, 1.64) - 0.82;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.82, 0.82, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.36 + time * 0.05, vec3(0.55, 0.56, 0.56), vec3(0.36, 0.50, 0.43), vec3(1.35, 0.90, 1.35), vec3(0.77, 0.34, 0.86)) * fog;
	col += vec3(0.30, 0.57, 0.95) * (it / 72.0) * 0.49;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
