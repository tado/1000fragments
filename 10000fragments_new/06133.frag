uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.00;
	vec3 mq = mod(q, 2.39) - 1.20;
	return length(mq) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.20, 1.20, -3.0);
	vec3 rd = normalize(vec3(p, 1.55));
	rd.xy = rot2(time * -0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.16 + time * 0.15, vec3(0.49, 0.41, 0.47), vec3(0.50, 0.43, 0.38), vec3(1.27, 1.30, 1.35), vec3(0.89, 0.32, 0.72)) * fog;
	col += vec3(0.36, 0.48, 0.47) * (it / 69.0) * 0.95;
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
