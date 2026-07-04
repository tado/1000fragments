uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.50);
    float gsh = hash21(vec2(grow, floor(t * 5.36))) - 0.5;
    float gx = p.x + gsh * 0.39;
    v = sin(gx * 7.29 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.02));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.84 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.98 + t * 3.06 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.61; }
	q1 = rot2(length(q1) * -1.38 + time * 0.92) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.96, length(q2) * 4.46 - time * 0.97); }
	q2 += vec2(0.10, -0.76) * sin(length(q2) * 2.63 - time * 0.86) * 0.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.62);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.36 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
