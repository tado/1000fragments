uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.37 * sin(mf + 3.0) + ph), cos(t * 2.37 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.40 + sr * 7.60 - t * 0.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.68 + time * 0.03, vec3(0.44, 0.50, 0.52), vec3(0.39, 0.49, 0.45), vec3(1.36, 1.10, 0.88), vec3(0.45, 0.18, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
