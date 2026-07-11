uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.76;
	vec3 mq = mod(q, 2.34) - 1.17;
	mq.xy = rot2(time * 1.98) * mq.xy;
	vec3 b = abs(mq) - vec3(0.29);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 0.98));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.18 + time * 0.37, vec3(0.55, 0.53, 0.48), vec3(0.49, 0.42, 0.30), vec3(1.22, 1.00, 0.71), vec3(0.72, 0.50, 0.45)) * fog;
	col += vec3(0.71, 0.77, 0.86) * (it / 66.0) * 0.45;
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
