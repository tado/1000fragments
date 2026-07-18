uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.64) * 1.32;
	float g = dot(sin(q * 3.74), cos(q.zxy * 3.74));
	return (abs(g) - 0.72) / (3.74 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.34;
	vec3 ro = vec3(0.0, 0.0, -3.37);
	vec3 rd = normalize(vec3(p, 1.76));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.15 + (time * 0.64) * 0.11, vec3(0.19, 0.37, 0.46), vec3(0.18, 0.29, 0.31), vec3(0.96, 1.02, 1.01), vec3(0.57, 0.48, 0.35)) * fog;
	col += vec3(0.96, 0.66, 0.72) * (it / 61.0) * 0.67;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.930, 1.000, 1.040);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
