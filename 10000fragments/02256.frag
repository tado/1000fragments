uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.93 + t * 3.04 + ph) + sin(p.y * 5.26 - t * 3.04 + ph)
        + sin((p.x + p.y) * 11.48 + t * 3.04 + ph) + sin(length(p) * 7.14 - t * 3.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 1.97 + time * 0.31) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.28; p = rot2(0.65) * p; }
	p = abs(p) - 0.39;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.72 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
