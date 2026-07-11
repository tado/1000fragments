uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.38;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.24 + 0.07 * sin(t * 1.67 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 4.65 + ga * 4.0 - t * 1.07 + ph);
    v = arm * exp(-gr * 1.41);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.39 * sin(time * 2.66);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.71);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.42 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
