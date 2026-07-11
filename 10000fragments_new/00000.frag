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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.05 * sin(mf + 3.0) + ph), cos(t * 2.19 * cos(mf + 3.0) + ph));
        ms += 0.091 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	p = (floor(p * 23.5) + 0.5) / 23.5;
	p = rot2(length(p) * -2.28 + time * 0.52) * p;
	p *= 2.41;
	p += vec2(-0.95, 0.12) * sin(length(p) * 3.67 - time * 1.93) * 0.39;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.84 + time * 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
