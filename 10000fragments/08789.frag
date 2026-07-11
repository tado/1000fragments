uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.07 * sin(mf + 3.0) + ph), cos(t * 2.07 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p += vec2(-0.37, -0.30) * sin(length(p) * 4.58 - time * 1.36) * 0.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.57 + time * 0.24, vec3(0.45, 0.48, 0.60), vec3(0.33, 0.35, 0.30), vec3(1.30, 1.40, 1.16), vec3(0.12, 0.37, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
