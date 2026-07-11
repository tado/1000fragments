uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.38);
    float gsh = hash21(vec2(grow, floor(t * 6.89))) - 0.5;
    float gx = p.x + gsh * 0.90;
    v = sin(gx * 8.60 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.75));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.00 + t * 3.93 + ph) * 0.7;
    float wb = sin(p.y * 12.04 - t * 2.63 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 2.96;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.05, lr * 1.89 + time * 0.58); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.05 + time * 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
