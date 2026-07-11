uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.27) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 1.79 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.01 + vec2(t * 0.48, -t * 2.78) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.18;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q2 = rot2(time * 1.42) * q2;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.44 / wf * sin(wf * 3.29 * q2.y + time * 2.16); q2.y += 0.47 / wf * cos(wf * 2.71 * q2.x + time * 0.74); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d = max(d1, d2);
	vec3 col = hue(d * 0.71 + time * 0.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
