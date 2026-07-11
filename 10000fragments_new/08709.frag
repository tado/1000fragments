uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.73;
	vec3 mq = mod(q, 2.24) - 1.12;
	return length(mq) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 1.66));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.23 + time * 0.35, vec3(0.60, 0.54, 0.58), vec3(0.46, 0.38, 0.49), vec3(0.75, 1.09, 0.78), vec3(0.32, 0.37, 0.97)) * fog;
	col += vec3(0.93, 0.84, 1.00) * (it / 61.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
