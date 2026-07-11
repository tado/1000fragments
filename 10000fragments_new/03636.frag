uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.15;
	vec3 mq = mod(q, 2.20) - 1.10;
	mq.xy = rot2(time * 0.86) * mq.xy;
	vec3 b = abs(mq) - vec3(0.28);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.10, 1.10, -3.0);
	vec3 rd = normalize(vec3(p, 0.94));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.28 + time * 0.05, vec3(0.57, 0.52, 0.54), vec3(0.41, 0.45, 0.41), vec3(0.83, 1.28, 0.85), vec3(0.99, 0.30, 0.62)) * fog;
	col += vec3(0.44, 0.88, 0.38) * (it / 56.0) * 0.61;
	col = fract(col * 1.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
