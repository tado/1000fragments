uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.78) * 1.62;
	vec3 mq = mod(q, 1.92) - 0.96;
	mq.xy = rot2((time * 0.78) * -1.58) * mq.xy;
	vec3 b = abs(mq) - vec3(0.25);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.96, 0.96, -3.0);
	vec3 rd = normalize(vec3(p, 1.39));
	rd.xy = rot2((time * 0.78) * 0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.17 + (time * 0.78) * 0.03, vec3(0.48, 0.50, 0.42), vec3(0.16, 0.16, 0.22), vec3(0.57, 0.52, 0.44), vec3(0.10, 0.74, 0.59)) * fog;
	col += vec3(0.54, 0.65, 0.39) * (it / 50.0) * 0.64;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 0.997, 0.958) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
