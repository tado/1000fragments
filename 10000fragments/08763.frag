uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.46 * sin(mf + 3.0) + ph), cos(t * 2.46 * cos(mf + 3.0) + ph));
        ms += 0.066 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.16, vec3(0.47, 0.45, 0.59), vec3(0.30, 0.47, 0.30), vec3(1.01, 1.21, 1.20), vec3(0.15, 0.94, 0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
