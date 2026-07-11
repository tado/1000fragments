uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}

float map(vec3 q){
	q.xz = rot2((time * 0.66) * 0.81) * q.xz;
	q.xy = rot2((time * 0.66) * 0.78) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.89, q.y);
	return length(w) - 0.28;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.70 + (time * 0.66) * 0.76) * 0.13;
	vec3 ro = vec3(0.0, 0.0, -3.36);
	vec3 rd = normalize(vec3(p, 0.94));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = hue(tt * 0.20 + (time * 0.66) * 0.12) * fog;
	col += vec3(0.96, 0.80, 0.32) * (it / 62.0) * 0.34;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.66)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.947, 0.992, 1.024) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
