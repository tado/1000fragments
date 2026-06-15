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
        vec2 mm = vec2(sin(t * 1.65 * sin(mf + 3.0) + ph), cos(t * 1.65 * cos(mf + 3.0) + ph));
        ms += 0.031 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.14, vec3(0.58, 0.55, 0.50), vec3(0.31, 0.48, 0.47), vec3(0.77, 0.76, 0.79), vec3(0.39, 0.18, 0.08));
	col = fract(col * 2.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
