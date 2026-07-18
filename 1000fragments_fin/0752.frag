uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.75) * 0.92;
}

float map(vec3 q){
	q.z += (time * 0.91) * 1.84;
	vec3 mq = mod(q, 1.90) - 0.95;
	mq.xy = rot2((time * 0.91) * 1.84) * mq.xy;
	vec3 b = abs(mq) - vec3(0.37);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 ro = vec3(0.95, 0.95, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	rd.xy = rot2((time * 0.91) * -0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = hue(tt * 0.12 + (time * 0.91) * 0.24) * fog;
	col += vec3(0.77, 0.50, 0.24) * (it / 61.0) * 0.41;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.051, 0.997, 0.930);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
