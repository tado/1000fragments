uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.24 + vec2(t * 0.57, -t * 1.97) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 33.96 - t * 7.20 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 12.40 - t * 1.80 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.26);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.97));
	vec3 col = hue(d * 0.62 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
