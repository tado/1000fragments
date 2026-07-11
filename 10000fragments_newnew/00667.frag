uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.90;
	vec3 mq = mod(q, 2.80) - 1.40;
	mq.xy = rot2(time * 1.27) * mq.xy;
	vec3 b = abs(mq) - vec3(0.24);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.40, 1.40, -3.0);
	vec3 rd = normalize(vec3(p, 0.96));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.10 + time * 0.24, vec3(0.42, 0.45, 0.45), vec3(0.35, 0.39, 0.40), vec3(0.70, 1.11, 1.23), vec3(0.33, 0.13, 0.65)) * fog;
	col += vec3(0.46, 0.57, 0.51) * (it / 69.0) * 0.53;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
