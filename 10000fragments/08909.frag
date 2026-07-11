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
        vec2 mm = vec2(sin(t * 2.26 * sin(mf + 3.0) + ph), cos(t * 2.26 * cos(mf + 3.0) + ph));
        ms += 0.043 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	p += vec2(-0.49, -0.93) * sin(length(p) * 3.15 - time * 0.60) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.20, vec3(0.59, 0.41, 0.41), vec3(0.33, 0.38, 0.48), vec3(1.10, 1.02, 1.18), vec3(0.54, 0.83, 0.95));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
