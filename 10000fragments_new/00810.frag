uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 35.20 - t * 1.55 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 39.40 - t * 1.36 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.68 * sin(mf + 3.0) + ph), cos(t * 1.92 * cos(mf + 3.0) + ph));
        ms += 0.100 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.55;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2.y += sin(q2.x * 3.89 + time * 3.99) * 0.23;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.91);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.79 + time * 0.13, vec3(0.54, 0.54, 0.57), vec3(0.31, 0.42, 0.40), vec3(1.01, 1.34, 1.34), vec3(0.27, 0.60, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
