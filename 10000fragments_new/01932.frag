uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.86;
	vec3 mq = mod(q, 1.98) - 0.99;
	mq.xy = rot2(time * 0.77) * mq.xy;
	vec3 b = abs(mq) - vec3(0.23);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.99, 0.99, -3.0);
	vec3 rd = normalize(vec3(p, 1.64));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.24 + time * 0.06, vec3(0.57, 0.60, 0.57), vec3(0.35, 0.46, 0.33), vec3(0.99, 1.04, 1.29), vec3(0.06, 0.66, 0.12)) * fog;
	col += vec3(0.89, 0.44, 0.53) * (it / 66.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
