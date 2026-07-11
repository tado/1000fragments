uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.40 * sin(mf + 3.0) + ph), cos(t * 0.40 * cos(mf + 3.0) + ph));
        ms += 0.071 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.62;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.18, vec3(0.55, 0.59, 0.45), vec3(0.41, 0.35, 0.33), vec3(0.99, 1.34, 1.11), vec3(0.98, 0.14, 0.03));
	col = mod(col * 2.13, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
