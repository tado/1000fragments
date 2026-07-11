uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.77;
	vec3 mq = mod(q, 2.43) - 1.22;
	return length(mq) - 0.38;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.23));
	rd.xy = rot2(time * -0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.17 + time * 0.25, vec3(0.59, 0.52, 0.57), vec3(0.47, 0.33, 0.39), vec3(0.80, 1.02, 0.96), vec3(0.17, 0.92, 0.65)) * fog;
	col += vec3(0.84, 0.68, 0.37) * (it / 51.0) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
