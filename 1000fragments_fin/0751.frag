uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.62) * 1.90;
	vec3 mq = mod(q, 2.53) - 1.26;
	mq.xy = rot2((time * 0.62) * 1.90) * mq.xy;
	vec3 b = abs(mq) - vec3(0.39);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.50;
	vec3 ro = vec3(1.26, 1.26, -3.0);
	vec3 rd = normalize(vec3(p, 1.56));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.18 + (time * 0.62) * 0.33, vec3(0.41, 0.42, 0.34), vec3(0.33, 0.30, 0.23), vec3(0.98, 0.99, 0.74), vec3(-0.03, 0.26, 0.40)) * fog;
	col += vec3(0.65, 0.56, 0.94) * (it / 60.0) * 0.34;
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.993, 1.003, 1.006);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
