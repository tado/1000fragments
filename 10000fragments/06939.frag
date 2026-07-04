uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.53;
	vec3 mq = mod(q, 1.87) - 0.94;
	mq.xy = rot2(time * -1.56) * mq.xy;
	vec3 b = abs(mq) - vec3(0.32);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.94, 0.94, -3.0);
	vec3 rd = normalize(vec3(p, 1.70));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.32 + time * 0.01, vec3(0.43, 0.53, 0.49), vec3(0.45, 0.49, 0.39), vec3(0.87, 1.18, 1.29), vec3(0.28, 0.93, 0.73)) * fog;
	col += vec3(0.52, 0.91, 0.53) * (it / 69.0) * 0.54;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
