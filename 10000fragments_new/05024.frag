uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.27;
	vec3 mq = mod(q, 2.48) - 1.24;
	mq.xy = rot2(time * -1.98) * mq.xy;
	vec3 b = abs(mq) - vec3(0.21);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.24, 1.24, -3.0);
	vec3 rd = normalize(vec3(p, 1.36));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.13 + time * 0.14, vec3(0.58, 0.56, 0.55), vec3(0.38, 0.37, 0.47), vec3(1.10, 1.12, 1.12), vec3(0.64, 0.26, 0.33)) * fog;
	col += vec3(0.81, 0.46, 0.84) * (it / 68.0) * 0.48;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
