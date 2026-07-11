uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}

float map(vec3 q){
	q.z += (time * 0.71) * 0.97;
	float g = dot(sin(q * 1.59), cos(q.zxy * 1.59));
	return (abs(g) - 0.36) / (1.59 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.39);
	vec3 rd = normalize(vec3(p, 1.33));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = hue(tt * 0.21 + (time * 0.71) * 0.21) * fog;
	col += vec3(0.71, 0.36, 0.35) * (it / 58.0) * 0.31;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 0.986, 0.997) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
