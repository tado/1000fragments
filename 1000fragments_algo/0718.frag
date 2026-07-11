uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.81) * 1.73;
	vec3 mq = mod(q, 2.79) - 1.39;
	mq.xy = rot2((time * 0.81) * -1.69) * mq.xy;
	vec3 b = abs(mq) - vec3(0.40);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	vec3 ro = vec3(1.39, 1.39, -3.0);
	vec3 rd = normalize(vec3(p, 0.91));
	rd.xy = rot2((time * 0.81) * -0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.25 + (time * 0.81) * 0.14, vec3(0.45, 0.37, 0.39), vec3(0.13, 0.12, 0.15), vec3(0.59, 0.53, 0.89), vec3(0.63, 0.40, 0.80)) * fog;
	col += vec3(0.91, 0.28, 0.61) * (it / 52.0) * 0.69;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.81)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(1.049, 1.007, 0.922) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
