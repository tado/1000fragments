uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.72;
	vec3 mq = mod(q, 2.45) - 1.23;
	mq.xy = rot2(time * 1.38) * mq.xy;
	vec3 b = abs(mq) - vec3(0.35);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.23, 1.23, -3.0);
	vec3 rd = normalize(vec3(p, 0.95));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.16 + time * 0.25, vec3(0.44, 0.59, 0.42), vec3(0.48, 0.40, 0.44), vec3(1.24, 1.25, 1.33), vec3(0.94, 0.80, 0.97)) * fog;
	col += vec3(0.31, 0.97, 0.22) * (it / 65.0) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
