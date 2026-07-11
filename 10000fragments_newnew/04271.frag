uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.46 * sin(mf + 3.0) + ph), cos(t * 0.99 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.47 + sr * 23.68 - t * 4.33 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 16.5) + 0.5) / 16.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.22);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.83 + time * 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
