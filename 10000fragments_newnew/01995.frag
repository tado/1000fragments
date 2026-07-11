uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.46 - t * 1.51;
    v = sin(floor(lv * 5.4) / 5.4 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	p = (floor(p * 25.0) + 0.5) / 25.0;
	p = sin(p * 2.34 + time * 1.66) * 1.43;
	p.y += sin(p.x * 6.25 + time * 3.16) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.19, 0.76, 0.86) * (0.05 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
