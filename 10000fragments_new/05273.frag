uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.66;
	vec3 mq = mod(q, 2.33) - 1.17;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.20));
	rd.xy = rot2(time * -0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.12 + time * 0.10, vec3(0.52, 0.59, 0.58), vec3(0.46, 0.37, 0.43), vec3(0.86, 1.24, 0.94), vec3(0.67, 0.28, 0.66)) * fog;
	col += vec3(0.52, 1.00, 0.23) * (it / 58.0) * 0.82;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
