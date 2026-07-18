uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.75) * 0.92;
}

float map(vec3 q){
	q.z += (time * 0.60) * 1.12;
	vec2 g = mod(vec2(q.x, q.z), 2.17) - 1.09;
	float d = length(g) - (0.31 + 0.05 * sin(q.y * 1.47 + (time * 0.60) * 3.26));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.42;
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 1.41));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = hue(tt * 0.11 + (time * 0.60) * 0.02) * fog;
	col += vec3(0.97, 0.80, 0.77) * (it / 64.0) * 0.73;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.004, 0.986, 0.990);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
