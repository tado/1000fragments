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
        vec2 mm = vec2(sin(t * 0.76 * sin(mf + 3.0) + ph), cos(t * 0.76 * cos(mf + 3.0) + ph));
        ms += 0.031 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.25, vec3(0.52, 0.47, 0.47), vec3(0.44, 0.36, 0.43), vec3(0.76, 1.19, 0.74), vec3(0.71, 0.23, 0.63));
	col = mod(col * 2.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
