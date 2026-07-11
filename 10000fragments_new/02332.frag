uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.93;
	vec3 mq = mod(q, 2.45) - 1.22;
	mq.xy = rot2(time * -1.49) * mq.xy;
	vec3 b = abs(mq) - vec3(0.31);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.56));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.38 + time * 0.32, vec3(0.57, 0.56, 0.42), vec3(0.33, 0.38, 0.33), vec3(1.16, 1.12, 0.95), vec3(0.65, 0.32, 0.59)) * fog;
	col += vec3(0.58, 0.67, 0.89) * (it / 68.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
