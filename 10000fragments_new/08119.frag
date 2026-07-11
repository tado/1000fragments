uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.60) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.72 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.71 + sr * 8.60 - t * 0.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.67) - 0.5;
	q2 *= 1.81;
	q2 += vec2(-0.95, -0.87) * sin(length(q2) * 5.49 - time * 0.93) * 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.37);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.85 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
