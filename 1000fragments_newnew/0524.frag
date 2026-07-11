uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.53) * 1.81;
	vec3 mq = mod(q, 1.95) - 0.97;
	mq.xy = rot2((time * 0.53) * -1.04) * mq.xy;
	vec3 b = abs(mq) - vec3(0.30);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.97, 0.97, -3.0);
	vec3 rd = normalize(vec3(p, 0.95));
	rd.xy = rot2((time * 0.53) * 0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.12 + (time * 0.53) * 0.39, vec3(0.41, 0.32, 0.34), vec3(0.17, 0.11, 0.14), vec3(0.67, 0.81, 0.45), vec3(0.87, 0.44, 0.82)) * fog;
	col += vec3(0.22, 0.79, 0.62) * (it / 60.0) * 0.61;
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.976, 1.029) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
