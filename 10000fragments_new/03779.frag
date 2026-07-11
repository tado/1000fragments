uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.94;
	vec3 mq = mod(q, 2.56) - 1.28;
	mq.xy = rot2(time * 1.99) * mq.xy;
	vec3 b = abs(mq) - vec3(0.37);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.28, 1.28, -3.0);
	vec3 rd = normalize(vec3(p, 1.60));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.31 + time * 0.24, vec3(0.41, 0.53, 0.43), vec3(0.46, 0.39, 0.46), vec3(0.76, 1.08, 0.73), vec3(0.73, 0.96, 0.36)) * fog;
	col += vec3(0.91, 0.97, 0.74) * (it / 65.0) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
