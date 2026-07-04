uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.97;
	vec3 mq = mod(q, 2.32) - 1.16;
	mq.xy = rot2(time * 1.63) * mq.xy;
	vec3 b = abs(mq) - vec3(0.42);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.68));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.21 + time * 0.22, vec3(0.43, 0.44, 0.48), vec3(0.43, 0.46, 0.44), vec3(1.17, 0.92, 0.91), vec3(0.60, 0.15, 0.85)) * fog;
	col += vec3(0.90, 0.51, 0.22) * (it / 67.0) * 0.46;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
