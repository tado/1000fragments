uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.45;
	vec3 mq = mod(q, 2.60) - 1.30;
	mq.xy = rot2(time * 1.13) * mq.xy;
	vec3 b = abs(mq) - vec3(0.27);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.30, 1.30, -3.0);
	vec3 rd = normalize(vec3(p, 0.94));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.21 + time * 0.33, vec3(0.45, 0.45, 0.42), vec3(0.34, 0.39, 0.32), vec3(0.88, 1.01, 1.14), vec3(0.81, 0.88, 0.75)) * fog;
	col += vec3(0.73, 0.21, 0.33) * (it / 58.0) * 0.50;
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 1.04 + time * 12.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
