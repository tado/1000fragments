uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.18, t * 1.07 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.35 + t * 1.15 + ph) + sin(p.y * 10.60 - t * 1.15 + ph)
        + sin((p.x + p.y) * 11.99 + t * 1.15 + ph) + sin(length(p) * 15.74 - t * 1.15 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.99 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
