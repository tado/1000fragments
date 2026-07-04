uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.09;
	vec3 mq = mod(q, 1.80) - 0.90;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.90, 0.90, -3.0);
	vec3 rd = normalize(vec3(p, 1.16));
	rd.xy = rot2(time * -0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.20 + time * 0.16, vec3(0.44, 0.45, 0.59), vec3(0.45, 0.33, 0.49), vec3(1.02, 0.73, 1.00), vec3(0.11, 0.46, 0.01)) * fog;
	col += vec3(0.93, 0.62, 0.81) * (it / 64.0) * 0.58;
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
