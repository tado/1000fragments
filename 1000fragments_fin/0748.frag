uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.70) * 1.86;
	vec2 g = mod(vec2(q.x, q.z), 2.17) - 1.09;
	float d = length(g) - (0.25 + 0.11 * sin(q.y * 3.92 + (time * 0.70) * 1.44));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.66));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.26 + (time * 0.70) * 0.01, vec3(0.28, 0.27, 0.41), vec3(0.42, 0.36, 0.48), vec3(1.04, 0.99, 1.05), vec3(0.61, 0.78, 0.13)) * fog;
	col += vec3(0.58, 0.49, 0.62) * (it / 60.0) * 0.50;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.016, 0.947, 1.014);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
