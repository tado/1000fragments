uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}

float map(vec3 q){
	q.z += (time * 0.50) * 0.74;
	float g = dot(sin(q * 3.71), cos(q.zxy * 3.71));
	return (abs(g) - 0.70) / (3.71 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.22);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2((time * 0.50) * -0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = hue(tt * 0.22 + (time * 0.50) * 0.09) * fog;
	col += vec3(0.54, 0.97, 0.88) * (it / 66.0) * 0.68;
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.976, 0.996) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
