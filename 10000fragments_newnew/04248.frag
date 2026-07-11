uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.18;
	vec3 mq = mod(q, 2.21) - 1.11;
	mq.xy = rot2(time * -1.70) * mq.xy;
	vec3 b = abs(mq) - vec3(0.35);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 0.95));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.28 + time * 0.13, vec3(0.51, 0.56, 0.53), vec3(0.49, 0.41, 0.39), vec3(0.72, 1.00, 0.98), vec3(0.60, 0.31, 0.87)) * fog;
	col += vec3(0.63, 0.58, 0.64) * (it / 69.0) * 0.47;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
