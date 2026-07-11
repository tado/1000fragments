uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.80) * 0.95;
}

float map(vec3 q){
	q.z += (time * 0.77) * 0.69;
	vec2 g = mod(vec2(q.x, q.z), 2.41) - 1.21;
	float d = length(g) - (0.17 + 0.09 * sin(q.y * 1.60 + (time * 0.77) * 1.50));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	vec3 ro = vec3(1.21, 1.21, -3.0);
	vec3 rd = normalize(vec3(p, 1.08));
	rd.xy = rot2((time * 0.77) * 0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = hue(tt * 0.14 + (time * 0.77) * 0.07) * fog;
	col += vec3(0.67, 0.93, 0.30) * (it / 68.0) * 0.83;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 1.003, 0.939) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
