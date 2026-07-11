uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.59 + t * 3.39 + ph) + sin(p.y * 5.46 - t * 3.39 + ph)
        + sin((p.x + p.y) * 10.78 + t * 3.39 + ph) + sin(length(p) * 6.03 - t * 3.39 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.90;
	p = rot2(p.y * -3.23 + time * 0.94) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.14; p = rot2(1.80) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.73 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
