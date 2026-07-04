uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.54;
	vec3 mq = mod(q, 1.65) - 0.82;
	return length(mq) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.82, 0.82, -3.0);
	vec3 rd = normalize(vec3(p, 1.46));
	rd.xy = rot2(time * 0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.16 + time * 0.12, vec3(0.44, 0.44, 0.53), vec3(0.30, 0.41, 0.37), vec3(1.29, 1.13, 1.39), vec3(0.10, 0.04, 0.90)) * fog;
	col += vec3(0.95, 0.82, 0.79) * (it / 63.0) * 0.31;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
