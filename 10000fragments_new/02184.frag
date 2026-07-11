uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.78;
	float g = dot(sin(q * 1.96), cos(q.zxy * 1.96));
	return (abs(g) - 0.43) / (1.96 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.27);
	vec3 rd = normalize(vec3(p, 1.68));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = hue(tt * 0.16 + time * 0.16) * fog;
	col += vec3(0.96, 0.25, 0.30) * (it / 55.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
