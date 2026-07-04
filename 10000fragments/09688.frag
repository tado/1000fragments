uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.57 + sr * 7.68 - t * 0.79 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.34 + t * 1.80 + ph) * 0.7;
    float wb = sin(p.y * 18.02 - t * 3.85 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.76;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 5.52 + time * 2.03) * 0.22;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.23);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.14, 0.06), vec3(0.87, 0.62, 0.41), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
