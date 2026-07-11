uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.55 * sin(t * 0.92) + t * 1.07 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.93 + sin(p.y * 4.76 + t * 0.97) * 2.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q2 += vec2(-0.30, 0.18) * sin(length(q2) * 3.75 - time * 0.88) * 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.95);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.03));
	vec3 col = hue(d * 1.44 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
