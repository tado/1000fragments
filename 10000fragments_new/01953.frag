uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	vec3 mq = mod(q, 1.80) - 0.90;
	return length(mq) - 0.48;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.90, 0.90, -3.0);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.13 + time * 0.08, vec3(0.57, 0.55, 0.43), vec3(0.35, 0.30, 0.39), vec3(1.09, 0.73, 0.99), vec3(0.30, 0.99, 0.45)) * fog;
	col += vec3(0.74, 0.32, 0.63) * (it / 69.0) * 0.48;
	col = fract(col * 1.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
