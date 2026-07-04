uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.98;
	vec3 mq = mod(q, 2.05) - 1.02;
	mq.xy = rot2(time * -0.85) * mq.xy;
	vec3 b = abs(mq) - vec3(0.28);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.02, 1.02, -3.0);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.27 + time * 0.20, vec3(0.53, 0.58, 0.57), vec3(0.33, 0.47, 0.31), vec3(1.07, 1.07, 0.85), vec3(0.42, 0.97, 0.21)) * fog;
	col += vec3(0.91, 0.34, 0.27) * (it / 48.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
