uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.93;
	vec3 mq = mod(q, 2.38) - 1.19;
	return length(mq) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.19, 1.19, -3.0);
	vec3 rd = normalize(vec3(p, 1.78));
	rd.xy = rot2(time * -0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.23 + time * 0.26, vec3(0.44, 0.48, 0.51), vec3(0.37, 0.31, 0.45), vec3(1.20, 1.18, 1.23), vec3(0.16, 0.02, 0.40)) * fog;
	col += vec3(0.54, 0.64, 0.92) * (it / 50.0) * 0.59;
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
