uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.04);
    float gsh = hash21(vec2(grow, floor(t * 4.10))) - 0.5;
    float gx = p.x + gsh * 0.64;
    v = sin(gx * 7.05 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.73));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.62 + t * 4.14 + ph) + sin(p.y * 4.70 - t * 4.14 + ph)
        + sin((p.x + p.y) * 3.81 + t * 4.14 + ph) + sin(length(p) * 11.86 - t * 4.14 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.34, lr * 2.54 + time * -0.98); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.96);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.97 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
