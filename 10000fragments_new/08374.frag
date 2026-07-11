uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.19;
	vec3 mq = mod(q, 2.54) - 1.27;
	mq.xy = rot2(time * -1.35) * mq.xy;
	vec3 b = abs(mq) - vec3(0.29);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.27, 1.27, -3.0);
	vec3 rd = normalize(vec3(p, 1.04));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.36 + time * 0.36, vec3(0.40, 0.40, 0.57), vec3(0.40, 0.34, 0.31), vec3(0.93, 1.07, 1.17), vec3(0.06, 0.16, 0.25)) * fog;
	col += vec3(0.84, 0.35, 0.41) * (it / 70.0) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
