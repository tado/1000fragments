uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.15;
	vec3 mq = mod(q, 2.77) - 1.38;
	mq.xy = rot2(time * -1.95) * mq.xy;
	vec3 b = abs(mq) - vec3(0.30);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.38, 1.38, -3.0);
	vec3 rd = normalize(vec3(p, 1.31));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.16 + time * 0.08, vec3(0.45, 0.56, 0.59), vec3(0.41, 0.49, 0.39), vec3(0.75, 0.88, 0.73), vec3(0.64, 0.03, 0.12)) * fog;
	col += vec3(0.77, 0.21, 0.40) * (it / 60.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
