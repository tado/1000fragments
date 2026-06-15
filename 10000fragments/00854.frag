uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.98 * sin(mf + 3.0) + ph), cos(t * 0.98 * cos(mf + 3.0) + ph));
        ms += 0.052 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 5.00 - time * 0.47); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.26 + time * 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
