uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.50) * 0.61;
	float g = dot(sin(q * 3.65), cos(q.zxy * 3.65));
	return (abs(g) - 0.48) / (3.65 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.11);
	vec3 rd = normalize(vec3(p, 1.46));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.21 + (time * 0.50) * 0.38, vec3(0.38, 0.31, 0.29), vec3(0.17, 0.16, 0.13), vec3(0.54, 0.60, 0.52), vec3(0.33, 0.13, 0.05)) * fog;
	col += vec3(0.93, 0.45, 0.57) * (it / 66.0) * 0.65;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 0.997, 0.999) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
