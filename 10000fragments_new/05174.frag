uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.84;
	vec3 mq = mod(q, 1.91) - 0.95;
	mq.xy = rot2(time * 1.73) * mq.xy;
	vec3 b = abs(mq) - vec3(0.25);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.95, 0.95, -3.0);
	vec3 rd = normalize(vec3(p, 1.71));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.38 + time * 0.37, vec3(0.48, 0.46, 0.44), vec3(0.46, 0.45, 0.40), vec3(0.87, 0.96, 1.29), vec3(0.96, 0.36, 0.61)) * fog;
	col += vec3(0.27, 0.64, 0.75) * (it / 65.0) * 0.32;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
