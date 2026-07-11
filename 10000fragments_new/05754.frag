uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.76;
	vec3 mq = mod(q, 1.69) - 0.84;
	return length(mq) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.84, 0.84, -3.0);
	vec3 rd = normalize(vec3(p, 1.16));
	rd.xy = rot2(time * -0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.10 + time * 0.27, vec3(0.57, 0.48, 0.55), vec3(0.43, 0.43, 0.37), vec3(0.81, 1.11, 1.27), vec3(0.80, 0.91, 0.05)) * fog;
	col += vec3(0.97, 0.36, 0.21) * (it / 65.0) * 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
