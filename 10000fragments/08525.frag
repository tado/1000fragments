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
        vec2 mm = vec2(sin(t * 1.30 * sin(mf + 3.0) + ph), cos(t * 1.30 * cos(mf + 3.0) + ph));
        ms += 0.038 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.51, t * 1.06 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	p += vec2(-0.30, 0.67) * sin(length(p) * 4.48 - time * 1.28) * 0.23;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.57);
	float d = d1 + d2;
	vec3 col = palette(d * 0.90 + time * 0.16, vec3(0.54, 0.48, 0.52), vec3(0.36, 0.33, 0.38), vec3(1.35, 0.88, 1.30), vec3(0.39, 0.97, 0.20));
	col = fract(col * 1.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
