uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.41 * sin(mf + 3.0) + ph), cos(t * 1.41 * cos(mf + 3.0) + ph));
        ms += 0.076 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	{ p = vec2(atan(p.y, p.x) * 1.17, length(p) * 4.55 - time * 0.48); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.76 + time * 0.20);
	col = mod(col * 2.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
