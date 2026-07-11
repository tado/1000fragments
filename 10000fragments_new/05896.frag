uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.87 + t * 3.85 + ph) * 0.7;
    float wb = sin(p.y * 10.14 - t * 2.09 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.44;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.36 + jf * 4.0), cos(t * 0.56 * jf)) * 0.86;
        xs += sin(length(p - im) * 103.30 - t * 9.94 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.88 * sin(mf + 3.0) + ph), cos(t * 0.73 * cos(mf + 3.0) + ph));
        ms += 0.036 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 3.18;
	q2 = fract(q2 * 1.32) - 0.5;
	q2.y += sin(q2.x * 6.62 + time * 2.11) * 0.20;
	q3 *= 2.73;
	q3 = rot2(time * 0.80) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.50);
	float d3 = fieldC(q3, time, 1.69);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = hue(d * 1.09 + time * 0.02);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 1.78 + time * 17.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
