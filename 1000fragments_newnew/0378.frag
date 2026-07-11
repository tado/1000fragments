uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.74) * 0.79;
	float g = dot(sin(q * 2.48), cos(q.zxy * 2.48));
	return (abs(g) - 0.36) / (2.48 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.34);
	vec3 rd = normalize(vec3(p, 1.02));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.36 + (time * 0.74) * 0.20, vec3(0.50, 0.47, 0.51), vec3(0.17, 0.12, 0.20), vec3(0.76, 0.69, 0.82), vec3(0.92, 0.02, 0.86)) * fog;
	col += vec3(0.29, 0.40, 0.48) * (it / 60.0) * 0.87;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.055, 0.998, 0.942) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
