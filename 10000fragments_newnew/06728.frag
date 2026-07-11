uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.35;
	vec2 g = mod(vec2(q.x, q.z), 2.50) - 1.25;
	float d = length(g) - (0.24 + 0.06 * sin(q.y * 2.53 + time * 3.21));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 1.13));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = hue(tt * 0.15 + time * 0.03) * fog;
	col += vec3(0.75, 0.82, 0.25) * (it / 71.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
