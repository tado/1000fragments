uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.68) * 1.38;
	vec3 mq = mod(q, 2.31) - 1.15;
	return length(mq) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.15, 1.15, -3.0);
	vec3 rd = normalize(vec3(p, 0.96));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.30 + (time * 0.68) * 0.33, vec3(0.32, 0.34, 0.39), vec3(0.25, 0.30, 0.23), vec3(0.52, 0.42, 0.48), vec3(0.53, 0.40, 0.30)) * fog;
	col += vec3(0.41, 0.73, 0.24) * (it / 60.0) * 0.99;
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 2.58 + (time * 0.68) * 5.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.979, 1.037) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
