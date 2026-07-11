uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.23 * sin(mf + 3.0) + ph), cos(t * 1.13 * cos(mf + 3.0) + ph));
        ms += 0.054 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.62) - 0.5;
	p = rot2(p.y * -3.29 + time * 0.56) * p;
	p.y += sin(p.x * 6.37 + time * 1.62) * 0.40;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 2.00 + time * 0.23);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.73 + time * 11.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
