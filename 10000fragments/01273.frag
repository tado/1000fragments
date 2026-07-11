uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.54 + t * 0.58 + ph) + sin(p.y * 9.19 - t * 0.58 + ph)
        + sin((p.x + p.y) * 12.00 + t * 0.58 + ph) + sin(length(p) * 9.83 - t * 0.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	p = rot2(1.91) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.46; p = rot2(1.48) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.27, length(p) * 2.36 - time * 0.15); }
	p += vec2(0.27, 0.30) * sin(length(p) * 4.33 - time * 0.52) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.57 + time * 0.16);
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
