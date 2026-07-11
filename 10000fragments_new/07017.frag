uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.14;
	vec3 mq = mod(q, 2.54) - 1.27;
	mq.xy = rot2(time * -1.58) * mq.xy;
	vec3 b = abs(mq) - vec3(0.38);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.27, 1.27, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.22 + time * 0.06, vec3(0.47, 0.57, 0.44), vec3(0.36, 0.30, 0.31), vec3(0.91, 1.33, 0.95), vec3(0.09, 0.91, 0.74)) * fog;
	col += vec3(0.92, 0.61, 0.89) * (it / 69.0) * 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
