uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.35 + sr * 14.43 - t * 3.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	{ float fr = length(p); p *= 1.0 + 0.39 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.45, length(p) * 4.70 - time * 0.27); }
	p *= 2.86;
	p = fract(p * 2.34) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.05, 0.32, 0.33), vec3(0.90, 0.72, 0.44), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
