uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.35;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 10.90 - t * 1.29 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.08, lr * 2.26 + time * 0.31); }
	p *= 1.0 + 0.27 * sin(time * 2.78);
	p = abs(p) - 0.27;
	p = fract(p * 1.93) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.49, 0.35), vec3(0.58, 0.75, 0.46), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
