uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	vec3 mq = mod(q, 2.15) - 1.07;
	mq.xy = rot2(time * 0.54) * mq.xy;
	vec3 b = abs(mq) - vec3(0.27);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.07, 1.07, -3.0);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2(time * -0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.21 + time * 0.06, vec3(0.47, 0.56, 0.44), vec3(0.42, 0.45, 0.32), vec3(1.36, 0.97, 0.78), vec3(0.94, 0.58, 0.87)) * fog;
	col += vec3(0.31, 0.59, 0.99) * (it / 59.0) * 0.64;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
