uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.45;
	float g = dot(sin(q * 2.54), cos(q.zxy * 2.54));
	return (abs(g) - 0.69) / (2.54 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.00);
	vec3 rd = normalize(vec3(p, 1.48));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = hue(tt * 0.23 + time * 0.27) * fog;
	col += vec3(0.88, 0.48, 0.84) * (it / 62.0) * 0.61;
	col *= 0.88 + 0.13 * sin(gl_FragCoord.y * 1.13 + time * 16.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
