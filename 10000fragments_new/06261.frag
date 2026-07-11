uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.41;
	vec3 mq = mod(q, 2.53) - 1.26;
	mq.xy = rot2(time * 1.47) * mq.xy;
	vec3 b = abs(mq) - vec3(0.35);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.26, 1.26, -3.0);
	vec3 rd = normalize(vec3(p, 1.50));
	rd.xy = rot2(time * -0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.15 + time * 0.25, vec3(0.47, 0.50, 0.55), vec3(0.46, 0.40, 0.44), vec3(0.92, 1.27, 0.83), vec3(0.83, 0.57, 0.64)) * fog;
	col += vec3(0.57, 0.22, 0.64) * (it / 71.0) * 0.79;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
