uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.15;
	vec3 mq = mod(q, 2.65) - 1.32;
	mq.xy = rot2(time * 0.71) * mq.xy;
	vec3 b = abs(mq) - vec3(0.40);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.32, 1.32, -3.0);
	vec3 rd = normalize(vec3(p, 1.43));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.27 + time * 0.27, vec3(0.49, 0.49, 0.51), vec3(0.34, 0.45, 0.43), vec3(0.97, 1.29, 1.12), vec3(0.19, 0.95, 0.53)) * fog;
	col += vec3(0.98, 0.28, 1.00) * (it / 65.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
