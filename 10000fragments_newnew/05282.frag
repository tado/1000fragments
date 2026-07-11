uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.47;
	vec3 mq = mod(q, 2.44) - 1.22;
	return length(mq) - 0.48;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.57));
	rd.xy = rot2(time * 0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.20 + time * 0.15, vec3(0.51, 0.45, 0.46), vec3(0.31, 0.36, 0.34), vec3(1.11, 1.00, 1.17), vec3(0.45, 0.43, 0.06)) * fog;
	col += vec3(0.91, 0.67, 0.75) * (it / 51.0) * 0.44;
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 1.77 + time * 12.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
