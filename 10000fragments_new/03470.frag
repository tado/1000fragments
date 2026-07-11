uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.01;
	vec3 mq = mod(q, 2.06) - 1.03;
	mq.xy = rot2(time * 1.38) * mq.xy;
	vec3 b = abs(mq) - vec3(0.26);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.08));
	rd.xy = rot2(time * 0.07) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.24 + time * 0.27, vec3(0.42, 0.44, 0.56), vec3(0.32, 0.49, 0.31), vec3(1.38, 1.17, 0.86), vec3(0.64, 0.57, 0.99)) * fog;
	col += vec3(0.37, 0.77, 0.91) * (it / 59.0) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
