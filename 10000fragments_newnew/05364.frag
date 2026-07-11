uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.41;
	vec3 mq = mod(q, 2.19) - 1.10;
	mq.xy = rot2(time * -1.80) * mq.xy;
	vec3 b = abs(mq) - vec3(0.27);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.10, 1.10, -3.0);
	vec3 rd = normalize(vec3(p, 1.31));
	rd.xy = rot2(time * -0.33) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.11 + time * 0.27, vec3(0.45, 0.53, 0.46), vec3(0.30, 0.40, 0.36), vec3(1.02, 1.05, 0.80), vec3(0.72, 0.11, 0.71)) * fog;
	col += vec3(0.34, 0.81, 0.77) * (it / 59.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
