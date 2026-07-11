uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.99;
	vec3 mq = mod(q, 2.00) - 1.00;
	mq.xy = rot2(time * 1.23) * mq.xy;
	vec3 b = abs(mq) - vec3(0.29);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.00, 1.00, -3.0);
	vec3 rd = normalize(vec3(p, 1.36));
	rd.xy = rot2(time * -0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.27 + time * 0.12, vec3(0.41, 0.53, 0.50), vec3(0.33, 0.30, 0.42), vec3(1.27, 1.13, 1.00), vec3(0.64, 0.08, 0.43)) * fog;
	col += vec3(0.77, 0.63, 0.67) * (it / 60.0) * 0.77;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
