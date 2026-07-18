uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.84) * 1.24;
	vec3 mq = mod(q, 1.74) - 0.87;
	return length(mq) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	vec3 ro = vec3(0.87, 0.87, -3.0);
	vec3 rd = normalize(vec3(p, 1.25));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.22 + (time * 0.84) * 0.30, vec3(0.58, 0.48, 0.36), vec3(0.29, 0.23, 0.20), vec3(1.04, 0.98, 1.01), vec3(0.01, 0.09, 0.26)) * fog;
	col += vec3(0.51, 0.34, 0.46) * (it / 62.0) * 0.68;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.51));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.961, 1.014, 0.939);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
