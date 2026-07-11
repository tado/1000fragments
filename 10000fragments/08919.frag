uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.38 * sin(mf + 3.0) + ph), cos(t * 0.38 * cos(mf + 3.0) + ph));
        ms += 0.024 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.97, length(p) * 3.19 - time * 0.16); }
	p = fract(p * 1.63) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.68 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
