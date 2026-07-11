uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.93;
	vec3 mq = mod(q, 1.81) - 0.91;
	mq.xy = rot2(time * -0.65) * mq.xy;
	vec3 b = abs(mq) - vec3(0.22);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.91, 0.91, -3.0);
	vec3 rd = normalize(vec3(p, 1.60));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.11 + time * 0.28, vec3(0.54, 0.47, 0.58), vec3(0.47, 0.38, 0.42), vec3(1.22, 0.78, 1.21), vec3(0.10, 0.82, 0.33)) * fog;
	col += vec3(0.68, 0.34, 0.28) * (it / 51.0) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
