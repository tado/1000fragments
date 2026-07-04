uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.24;
	vec3 mq = mod(q, 1.79) - 0.90;
	return length(mq) - 0.47;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.90, 0.90, -3.0);
	vec3 rd = normalize(vec3(p, 1.56));
	rd.xy = rot2(time * 0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.37 + time * 0.07, vec3(0.53, 0.59, 0.51), vec3(0.45, 0.37, 0.34), vec3(0.78, 0.85, 1.04), vec3(0.23, 0.78, 0.92)) * fog;
	col += vec3(0.21, 0.58, 0.32) * (it / 59.0) * 0.78;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.93 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
