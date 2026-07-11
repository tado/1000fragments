uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.30;
	vec3 mq = mod(q, 1.79) - 0.90;
	return length(mq) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.90, 0.90, -3.0);
	vec3 rd = normalize(vec3(p, 1.04));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.28 + time * 0.30, vec3(0.50, 0.58, 0.58), vec3(0.35, 0.39, 0.37), vec3(1.18, 1.20, 0.74), vec3(0.25, 0.25, 0.31)) * fog;
	col += vec3(0.56, 0.20, 0.88) * (it / 59.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
