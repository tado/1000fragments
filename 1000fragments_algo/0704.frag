uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}

float map(vec3 q){
	q.z += (time * 0.79) * 1.99;
	vec2 g = mod(vec2(q.x, q.z), 2.60) - 1.30;
	float d = length(g) - (0.25 + 0.09 * sin(q.y * 2.25 + (time * 0.79) * 2.83));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.30, 1.30, -3.0);
	vec3 rd = normalize(vec3(p, 1.53));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = hue(tt * 0.11 + (time * 0.79) * 0.00) * fog;
	col += vec3(0.31, 0.28, 0.57) * (it / 69.0) * 0.39;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.920, 0.994, 1.031) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
