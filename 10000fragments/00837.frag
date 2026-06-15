uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.82 * sin(mf + 3.0) + ph), cos(t * 0.82 * cos(mf + 3.0) + ph));
        ms += 0.095 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.00 + sr * 17.57 - t * 0.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	p += vec2(-0.70, -0.33) * sin(length(p) * 4.10 - time * 1.61) * 0.39;
	p = abs(p) - 0.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.80);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.70 + time * 0.23, vec3(0.60, 0.58, 0.53), vec3(0.39, 0.40, 0.33), vec3(1.30, 1.35, 1.36), vec3(0.98, 0.92, 0.11));
	col = clamp((col - 0.5) * 1.45 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
