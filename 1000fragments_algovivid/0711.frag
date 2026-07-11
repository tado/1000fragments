uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	q.z += (time * 0.79) * 1.89;
	vec3 mq = mod(q, 2.37) - 1.18;
	return length(mq) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p += vec2(sin((time * 0.79) * 0.81), cos((time * 0.79) * 1.05)) * 0.13;
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.19));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.18 + (time * 0.79) * 0.23, vec3(0.34, 0.30, 0.37), vec3(0.25, 0.27, 0.27), vec3(0.71, 0.68, 0.62), vec3(0.54, 0.98, 0.14)) * fog;
	col += vec3(0.31, 0.99, 0.35) * (it / 68.0) * 0.98;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.947, 0.976, 1.028) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
