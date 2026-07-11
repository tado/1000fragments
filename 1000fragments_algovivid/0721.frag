uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.80) * 0.95;
}

float map(vec3 q){
	q.z += (time * 0.79) * 2.08;
	vec3 mq = mod(q, 2.60) - 1.30;
	mq.xy = rot2((time * 0.79) * 1.97) * mq.xy;
	vec3 b = abs(mq) - vec3(0.39);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.79) * 0.51), cos((time * 0.79) * 0.68)) * 0.24;
	vec3 ro = vec3(1.30, 1.30, -3.0);
	vec3 rd = normalize(vec3(p, 1.63));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = hue(tt * 0.10 + (time * 0.79) * 0.10) * fog;
	col += vec3(0.99, 0.60, 0.43) * (it / 55.0) * 0.62;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(1.060, 1.005, 0.915) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
