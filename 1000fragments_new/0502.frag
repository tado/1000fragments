uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.67;
	vec3 mq = mod(q, 2.18) - 1.09;
	mq.xy = rot2(time * 0.82) * mq.xy;
	vec3 b = abs(mq) - vec3(0.22);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.73));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.18 + time * 0.30, vec3(0.47, 0.57, 0.44), vec3(0.32, 0.31, 0.50), vec3(0.87, 1.21, 0.71), vec3(0.71, 0.33, 0.27)) * fog;
	col += vec3(0.88, 0.99, 0.64) * (it / 48.0) * 0.37;
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 2.41 + time * 4.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
