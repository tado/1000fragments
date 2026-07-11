uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.89;
	vec3 mq = mod(q, 1.97) - 0.99;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.99, 0.99, -3.0);
	vec3 rd = normalize(vec3(p, 0.96));
	rd.xy = rot2(time * -0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.33 + time * 0.08, vec3(0.59, 0.59, 0.53), vec3(0.36, 0.43, 0.50), vec3(1.12, 1.15, 0.98), vec3(0.32, 0.30, 0.10)) * fog;
	col += vec3(0.37, 0.34, 0.43) * (it / 56.0) * 0.68;
	col = fract(col * 2.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
