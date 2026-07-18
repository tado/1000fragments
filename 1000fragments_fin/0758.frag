uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.38, 0.58, 0.53);
		q.xy = rot2(0.25 + (time * 0.62) * 0.28) * q.xy;
		q.xz = rot2(1.37) * q.xz;
		q *= 1.44; sc *= 1.44;
	}
	vec3 b = abs(q) - vec3(0.52);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 ro = vec3(0.0, 0.0, -2.62);
	vec3 rd = normalize(vec3(p, 1.74));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.20 + (time * 0.62) * 0.32, vec3(0.54, 0.49, 0.39), vec3(0.28, 0.23, 0.21), vec3(1.00, 1.03, 0.96), vec3(0.00, 0.10, 0.27)) * fog;
	col += vec3(0.33, 0.73, 0.69) * (it / 63.0) * 0.91;
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.962, 1.017, 0.930);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
