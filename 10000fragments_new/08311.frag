uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.76;
	vec3 mq = mod(q, 2.12) - 1.06;
	mq.xy = rot2(time * -1.92) * mq.xy;
	vec3 b = abs(mq) - vec3(0.31);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.06, 1.06, -3.0);
	vec3 rd = normalize(vec3(p, 1.22));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.33 + time * 0.01, vec3(0.44, 0.47, 0.46), vec3(0.38, 0.48, 0.41), vec3(1.20, 0.91, 1.25), vec3(0.07, 0.85, 0.48)) * fog;
	col += vec3(0.78, 0.79, 0.57) * (it / 53.0) * 0.44;
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 1.05 + time * 7.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
