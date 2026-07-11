uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.37;
	vec3 mq = mod(q, 1.61) - 0.80;
	return length(mq) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.80, 0.80, -3.0);
	vec3 rd = normalize(vec3(p, 1.53));
	rd.xy = rot2(time * -0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.40 + time * 0.28, vec3(0.50, 0.40, 0.42), vec3(0.31, 0.37, 0.46), vec3(0.73, 0.88, 1.06), vec3(0.47, 0.97, 0.42)) * fog;
	col += vec3(0.35, 0.61, 0.43) * (it / 50.0) * 0.91;
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 1.18 + time * 5.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
