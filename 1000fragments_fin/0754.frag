uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.69) * 0.91;
	vec2 g = mod(vec2(q.x, q.z), 2.02) - 1.01;
	float d = length(g) - (0.24 + 0.13 * sin(q.y * 3.95 + (time * 0.69) * 1.23));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.52));
	rd.xy = rot2((time * 0.69) * 0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.13 + (time * 0.69) * 0.34, vec3(0.74, 0.61, 0.63), vec3(0.23, 0.26, 0.19), vec3(1.01, 0.98, 1.04), vec3(0.93, 0.02, 0.06)) * fog;
	col += vec3(0.76, 0.98, 0.56) * (it / 67.0) * 0.43;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.969, 1.007, 0.941);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
