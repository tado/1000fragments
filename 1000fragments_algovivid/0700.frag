uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.80) * 0.95;
}

float map(vec3 q){
	q.z += (time * 0.55) * 1.26;
	float g = dot(sin(q * 1.74), cos(q.zxy * 1.74));
	return (abs(g) - 0.57) / (1.74 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.78);
	vec3 rd = normalize(vec3(p, 1.59));
	rd.xy = rot2((time * 0.55) * 0.40) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = hue(tt * 0.17 + (time * 0.55) * 0.29) * fog;
	col += vec3(0.22, 0.78, 0.32) * (it / 49.0) * 0.89;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col = clamp(col, 0.0, 1.0) * vec3(0.926, 0.991, 1.058) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
