uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.15;
	vec3 mq = mod(q, 2.01) - 1.00;
	return length(mq) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.00, 1.00, -3.0);
	vec3 rd = normalize(vec3(p, 1.72));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.15 + time * 0.28, vec3(0.49, 0.57, 0.60), vec3(0.48, 0.42, 0.47), vec3(1.31, 0.93, 0.77), vec3(0.82, 0.25, 0.81)) * fog;
	col += vec3(0.31, 0.92, 0.50) * (it / 51.0) * 0.96;
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
